const { app } = require('../app');
const request = require('supertest');
const mysql = require("mysql2");
const con = mysql.createPool(
  {
  host: "us-cdbr-east-03.cleardb.com",
  user: "b5cd67a2d76a54",
  password:"b41d2cef",
  database: "heroku_cebdef809dbeebc",
  }
  );
  var currentUser = {
    curUserId: 0,
    curUserFname: "",
    curUserLname: "",
    curUserPhone: "",
    curUserEmail: "",
    curUserAddr: "",
  };
//TC1
test('Test to check if the homepage renders', async () => {
    let res = await request(app).get('/');
    expect(res.status).toBe(200);
})
//TC2
test('Test to check if the Sign up page renders', async () => {
    let res = await request(app).get('/register');
    expect(res.status).toBe(200);
})

//TC3
test('Test to check if the Sign in page renders', async () => {
    let res = await request(app).get('/login');
    expect(res.status).toBe(200);
})

//TC4
test('Test to check if the admin login page renders', async () => {
    let res = await request(app).get('/adminlogin');
    expect(res.status).toBe(200);
})

//TC5
test('Test to check if the admin dashboard page renders', async () => {
    let res = await request(app).get('/admin/dashboard');
    expect(res.status).toBe(200);
})

//TC6
test('Test to check if the aboutus page renders', async () => {
    let res = await request(app).get('/aboutus');
    expect(res.status).toBe(200);
})
//TC7
test('Test to check if the contact us page renders', async () => {
    let res = await request(app).get('/contactus');
    expect(res.status).toBe(200);
})

//TC9
test('Test to check if the admin add recipe page renders', async () => {
    let res = await request(app).get('/admin/addrecipe');
    expect(res.status).toBe(200);
})

//TC10
test('Test to check if the admin show food categories page renders', async () => {
    let res = await request(app).get('/admin/showfoodcategory');
    expect(res.status).toBe(200);
})
//TC11
test('Test to check if the admin add food category page renders', async () => {
    let res = await request(app).get('/admin/addfoodcategory');
    expect(res.status).toBe(200);
})

//TC12
test('Test to check if the admin users list page renders', async () => {
    let res = await request(app).get('/admin/users');
    expect(res.status).toBe(200);
})

//TC13
test('Test to check if the change password renders', async () => {
    let res = await request(app).get('/changePassword');
    expect(res.status).toBe(200);
})
//TC14
test('Test to check if the update profile page renders', async () => {
    let res = await request(app).get('/updateProfile');
    expect(res.status).toBe(200);
})

//TC16
test('Test to check if the my cart page renders', async () => {
    let res = await request(app).get('/mycart');
    expect(res.status).toBe(200);
})

//TC17
test('Test to check if the menu page renders', async () => {
    let res = await request(app).get('/menu');
    expect(res.status).toBe(200);
})

//TC18
test("Test case to check for database connection", done => {
    const q1 = con.query(
      "SELECT * FROM customer",
      (error, results) => {
        if (error) {
          throw error;
        }
        expect(results).not.toBe([]);
        done();
      }
    );
  });

//TC 20
test("Test case to register a new user ", done => {
    const query1 = `INSERT INTO customer (FirstName, LastName, PhoneNum, Email, Password, Address) VALUES ("TempName", "TempLname", "TempPhno", "TempEmail", "TempPass", "TempAddress")`
    const q1 = con.query(query1,
      (error, results) => {
        if (error) {
          throw error;
        }
        expect(results.affectedRows).toBe(1);
        done();
      }
    );
  });

  //TC 21
test("Test case to update user profile ", done => {
    const query1 = `UPDATE customer SET FirstName = "Tester", LastName = "Tests", Address = "Nowhere" WHERE Email = "TempEmail"`
    const q1 = con.query(query1,
      (error, results) => {
        if (error) {
          throw error;
        }
        expect(results.affectedRows).not.toBe(0);
        done();
      }
    );
  });

//TC 22
test("Test case to update user password ", done => {
    const query1 = `SELECT Password FROM customer WHERE Email = "TempEmail"`
    const q1 = con.query(query1,
      (error, results1) => {
        if (error) {
          throw error;
        }
        var sql = `UPDATE customer SET Password = "TempPass2" WHERE Email = "TempEmail"`;
        const q2 =con.query(sql,(error, results) => {
            if (error) {
              throw error;
            }
            expect(results.affectedRows).not.toBe(0);
        });
        
      done();
    }
    );
  });

  //TC 23
test("Test case to show the menu to the user", done => {
    const query1 = `SELECT * FROM recipe`
    const q1 = con.query(query1,
      (error, results) => {
        if (error) {
          throw error;
        }
        expect(results).not.toBe([]);
        done();
      }
    );
  });

//TC 24
test("Test case to place an order", done => {
    const query1 =`INSERT INTO orders (idCustomer, Date, Time, Address, Status) VALUES ("1", "2021-05-10", "1000-01-01 00:00:00", "TempAddress", "1")`
    const q1 = con.query(query1,
      (error, results) => {
        if (error) {
          throw error;
        }
        expect(results).not.toBe([]);
        done();
      }
    );
  });

//TC 25
test("Test case to add a new category", done => {
    const query1 =`INSERT INTO category (Name) VALUES ("TempCategory")`;
    const q1 = con.query(query1,
      (error, results) => {
        if (error) {
          throw error;
        }
        expect(results).not.toBe([]);
        done();
      }
    );
  });
//TC 26
test("Test case to add a recipe item in a category", done => {
    const query1 =`SELECT idCategory FROM category WHERE Name = 'TempCategory'`;
    const sql2 = `INSERT INTO recipe (Name, Description, idCategory, Price, Image) VALUES ('TempRecipe', 'TempDescription', '9999', '530', 'TempImageURL')`;
    const q1 = con.query(query1,
      (error, results) => {
        if (error) {
          throw error;
        }
        const q2 =con.query(sql2,
            (error, results1) => {
                if (error) {
                  throw error;
                }
                expect(results1.affectedRows).toBe(1);
            }
        )
        done();
      }
    );
  });


