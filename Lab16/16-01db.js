const sql = require('mssql');
const dbConfig = require('./dbconfig.js');
async function ExecuteSQL(sqlQ) {
    await sql.connect(dbConfig, async function (err) {
        if (err) console.log(err);
        let request = await new sql.Request();
        await request.query(sqlQ, async function (err, recordset) {
            if (err) console.log(err);
            let result = await recordset.recordset;
            console.log(result);
            let new_r = await JSON.stringify(result);
            console.log(new_r);
            console.log(typeof (result));
            return new_r;
        })
    })
}

function DB() {
    this.getFaculties = async (args, context) => {
        console.log(args);
        let k = [];
        let f = [];
        if (args.faculty == null) {
            f = await ExecuteSQL('SELECT FACULTY,FACULTY_NAME FROM FACULTY');
        } else f = await ExecuteSQL("SELECT FACULTY,FACULTY_NAME FROM FACULTY Where faculty='" + args.faculty + "'");
        f = f.rows;
        for (let i = 0; i < f.length; i++) {
            k[i] = {faculty: f[i][0], faculty_name: f[i][1]};
        }
        return k;
    };
    this.getSubjects = async (args, context) => {
        console.log(args);
        let f = [];
        let k = [];
        if (args.subject == null) {
            f = await ExecuteSQL('SELECT Subject,Subject_NAME,Pulpit FROM Subject');
        } else f = await ExecuteSQL("SELECT Subject,Subject_NAME,Pulpit FROM Subject Where Subject='" + args.subject + "'");
        f = f.rows;
        for (let i = 0; i < f.length; i++) {
            k[i] = {subject: f[i][0], subject_name: f[i][1], pulpit: f[i][2]};
        }
        return k;
    };
    this.getTeachers = async (args, context) => {
        console.log(args);
        let f = [];
        let k = [];
        if (args.teacher == null) {
            f = await ExecuteSQL('SELECT Teacher,Teacher_NAME,Pulpit FROM Teacher');
        } else f = await ExecuteSQL("SELECT Teacher,Teacher_NAME,Pulpit FROM Teacher Where Teacher='" + args.teacher + "'");
        f = f.rows;
        for (let i = 0; i < f.length; i++) {
            k[i] = {teacher: f[i][0], teacher_name: f[i][1], pulpit: f[i][2]};
        }
        return k;
    };
    this.getFaculty = async (faculty) => {
        console.log(1);
        //console.log(args);
        return ExecuteSQL("SELECT FACULTY,FACULTY_NAME FROM FACULTY WHERE FACULTY='" + faculty + "'");
    };
    this.getPulpits = async (args, context) => {
        let f;
        let k = [];
        if (args.pulpit == null) {
            console.log('Start');
            await sql.connect(dbConfig, async function (err) {
                console.log('Connected');
                if (err) console.log(err);
                let request = await new sql.Request();
                await request.query('SELECT PULPIT,PULPIT_NAME,FACULTY FROM PULPIT', async function (err, recordset) {
                    if (err) console.log(err);
                    f = await recordset.recordset;
                    // let new_r = await JSON.stringify(f);
                    // console.log(new_r);
                    // console.log(typeof (result));
                    //return new_r;
                    //f = f.;
                    console.log(JSON.stringify(f));
                    console.log(`F[0] = ${f[0].PULPIT}`);
                    console.log(`F[0] = ${f.length}`);
                    for (let i = 0; i < f.length; i++) {
                       k[i] = {pulpit: f[i].PULPIT, pulpit_name: f[i].PULPIT_NAME, faculty: f[i].FACULTY};
                    }
                    console.log(k);
                    return k;
                })
            })
        } else {
            f = await ExecuteSQL("SELECT PULPIT,PULPIT_NAME,FACULTY FROM PULPIT Where Pulpit='" + args.pulpit + "'");
        }

    };
    this.getPulpit = async (pulpit) => {
        return await ExecuteSQL("SELECT PULPIT,PULPIT_NAME,FACULTY FROM PULPIT WHERE Pulpit='" + pulpit.pulpit + "'");
    };
    this.getPulpitsByFaculty = async (faculty) => {
        return await ExecuteSQL("SELECT PULPIT,PULPIT_NAME,FACULTY FROM PULPIT WHERE FACULTY='" + faculty.faculty + "'");
    };
    this.setFaculty = async (faculty) => {
        let k = await ExecuteSQL("SELECT FACULTY,FACULTY_NAME FROM FACULTY WHERE FACULTY='" + faculty.faculty + "'");
        if (k.length > 0) {
            await ExecuteSQL(`Update FACULTY Where Faculty='${faculty.faculty}' Set Faculty_name='${faculty.faculty_name}')`);
        } else {
            console.log(faculty.faculty);
            console.log(faculty.faculty_name);
            await ExecuteSQL(`INSERT INTO FACULTY(FACULTY,FACULTY_NAME) values('${faculty.faculty}','${faculty.faculty_name}')`);
        }
        return faculty;
    };
    this.setPulpit = async (pulpit) => {
        let k = await ExecuteSQL("Select PULPIT,PULPIT_NAME,FACULTY FROM PULPIT WHERE Pulpit='" + pulpit.pulpit + "'");
        if (k.length > 0) {
            await ExecuteSQL(`Update PULPIT Where Pulpit='${pulpit.pulpit}' Set Pulpit_name='${pulpit.pulpit}',faculty='${pulpit.faculty}')`);
        } else {
            await ExecuteSQL(`INSERT INTO PULPIT(PULPIT,PULPIT_NAME,FACULTY) values('${pulpit.pulpit}','${pulpit.pulpit_name}','${pulpit.faculty}')`);
        }
        return pulpit;
    };
    this.setSubject = async (subject) => {
        let k = await ExecuteSQL("Select Subject,Subject_NAME,pulpit FROM Subject WHERE Subject='" + subject.subject + "'");
        if (k.length > 0) {
            await ExecuteSQL(`Update Subject Where Subject='${subject.subject}' Set Subject_name='${subject.subject_name}',pulpit='${subject.pulpit}')`);
        } else {
            await ExecuteSQL(`INSERT INTO Subject(Subject,Subject_NAME,pulpit) values('${subject.subject}','${subject.subject_name}','${subject.pulpit}')`);
        }
        return subject;
    };
    this.setTeacher = async (teacher) => {
        let k = await ExecuteSQL("Select Teacher,Teacher_NAME,pulpit FROM Teacher WHERE Teacher='" + teacher.teacher + "'");
        if (k.length > 0) {
            await ExecuteSQL(`Update Teacher Where Teacher='${teacher.teacher}' Set Teacher_name='${teacher.teacher_name}',pulpit='${teacher.pulpit}')`);
        } else {
            await ExecuteSQL(`INSERT INTO Teacher(Teacher,Teacher_NAME,pulpit) values('${teacher.teacher}','${teacher.teacher_name}','${teacher.pulpit}')`);
        }
        return teacher;
    };
    this.delFaculty = async (faculty) => {
        let k = await ExecuteSQL("Delete FACULTY WHERE FACULTY='" + faculty.faculty + "'");
        k = k.rowsAffected;
        return k > 0;
    };
    this.delPulpit = async (pulpit) => {
        let k = await ExecuteSQL("Delete Pulpit WHERE Pulpit='" + pulpit.pulpit + "'");
        k = k.rowsAffected;
        return k > 0;
    };
    this.delSubject = async (subject) => {
        let k = await ExecuteSQL("Delete Subject WHERE Subject='" + subject.subject + "'");
        k = k.rowsAffected;
        return k > 0;
    };
    this.delTeacher = async (teacher) => {
        let k = await ExecuteSQL("Delete Teacher WHERE Teacher='" + teacher.teacher + "'");
        k = k.rowsAffected;
        return k > 0;
    };
    this.getTeachersByFaculty = async (faculty) => {
        let f = await ExecuteSQL("Select Teacher.Teacher,Teacher.Teacher_Name,Teacher.Pulpit from Teacher Inner Join" +
            " Pulpit On Teacher.Pulpit=Pulpit.Pulpit Inner Join Faculty On " +
            "Pulpit.Faculty=faculty.faculty Where faculty.Faculty='" + faculty + "'");
        let k = [];
        f = f.rows;
        for (let i = 0; i < f.length; i++) {
            k[i] = {teacher: f[i][0], teacher_name: f[i][1], pulpit: f[i][2]};
        }
        return k;
    };
    this.getSubjectsByFaculties = async (faculty) => {
        let f = await ExecuteSQL("Select Subject.Subject,Subject.Subject_Name,Subject.Pulpit from Subject " +
            "Inner Join Pulpit On Subject.Pulpit=Pulpit.Pulpit Inner Join Faculty On " +
            "Pulpit.Faculty=faculty.faculty Where faculty.Faculty='" + faculty + "'");
        let k = [];
        f = f.rows;
        for (let i = 0; i < f.length; i++) {
            k[i] = {subject: f[i][0], subject_name: f[i][1], pulpit: f[i][2]};
        }
        return k;
    }
}

const resolver =
    {
        faculties: async (args, context) => {
            //console.log(f);
            return await context.getFaculties(args, context);
        },
        pulpits: async (args, context) => {
            return await context.getPulpits(args, context);
        },
        subjects: async (args, context) => {
            //console.log(f);
            return await context.getSubjects(args, context);
        },
        teachers: async (args, context) => {
            //console.log(f);
            return await context.getTeachers(args, context);
        },
        add_faculty: async (args, context) => {
            return await context.setFaculty(args.faculty);
        },
        add_subject: async (args, context) => {
            return await context.setSubject(args.subject);
        },
        add_teacher: async (args, context) => {
            return await context.setTeacher(args.teacher);
        },
        add_pulpit: async (args, context) => {
            return await context.setPulpit(args.pulpit);
        },
        del_faculty: async (args, context) => {
            return await context.delFaculty(args.faculty);
        },
        del_subject: async (args, context) => {
            return await context.delSubject(args.subject);
        },
        del_teacher: async (args, context) => {
            return await context.delTeacher(args.teacher);
        },
        del_pulpit: async (args, context) => {
            return await context.delPulpit(args.pulpit);
        },
        teachers_by_faculty: async (args, context) => {
            return await context.getTeachersByFaculty(args.faculty);
        },
        subjects_by_faculty: async (args, context) => {
            return await context.getSubjectsByFaculties(args.faculty);
        }
    }
exports.DB = new DB();
exports.resolver = resolver;