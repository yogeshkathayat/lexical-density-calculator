import request from "supertest";
import app from "../src/config/app";


/**
 * Connecting with database before running test cases
 */
beforeAll(async () => {
    setTimeout(() => {
        import("../src/config/mongoose"); 
    }, 4000);
  
});



/**
 * Testing health api
 */
describe("GET /api/v1/health", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api/v1/health")
      .expect(200);
  });
});


/**
 * Testing post /case/resolve endpoint
 */
describe("POST /api/v1/lexical/complexity", function () {
    let data = {
        // no parameters
    };
    it("It should return 400 BAD REQUEST without text parameter", function (done) {
        request(app)
            .post("/api/v1/lexical/complexity")
            .send(data)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });



     let data2={
        text:'testing a random text'
    }
    it("It should return 200 OK with a random text", function (done) {
        request(app)
            .post("/api/v1/lexical/complexity")
            .send(data2)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let data3={
        text:'t'.repeat(1001)
    }

    it("It should return 400 BAD REQUEST with more then 1000 characters", function (done) {
        request(app)
            .post("/api/v1/lexical/complexity")
            .send(data3)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let data4={
        text:'t'.repeat(999)
    }

    it("It should return 200 OK when total characters are 999" , function (done) {
        request(app)
            .post("/api/v1/lexical/complexity")
            .send(data4)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let testdata5={
        text:'text '.repeat(98)
    }

    it("It should return 200 OK when words are 99", function (done) {
        request(app)
            .post("/api/v1/lexical/complexity")
            .send(testdata5)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let testdata6={
        text:'text '.repeat(101)
    }

    it("It should return 400 BAD REQUEST when words are more then 100", function (done) {
        request(app)
            .post("/api/v1/lexical/complexity")
            .send(testdata6)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


});



/**
 * Testing post /case/resolve endpoint
 */
describe("POST /api/v1/lexical/complexity?mode=verbose", function () {
    const data = {
        // no parameters
    };
    it("It should return 400 BAD REQUEST with no text parameter", function (done) {
        request(app)
            .post("/api/v1/lexical/complexity?mode=verbose")
            .send(data)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let data2={
        text:'testing a random text. really?'
    }
    it("It should return 200 OK with a multi sentence text", function (done) {
        request(app)
            .post("/api/v1/lexical/complexity?mode=verbose")
            .send(data2)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let data3={
        text:'t'.repeat(1001)
    }

    it("It should return 400 BAD REQUEST with more then 1000 characters", function (done) {
        request(app)
            .post("/api/v1/lexical/complexity?mode=verbose")
            .send(data3)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let data4={
        text:'t'.repeat(999)
    }

    it("It should return 200 OK when total characters are 999" , function (done) {
        request(app)
            .post("/api/v1/lexical/complexity?mode=verbose")
            .send(data4)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let testdata5={
        text:'text '.repeat(98)
    }

    it("It should return 200 OK when words are 99", function (done) {
        request(app)
            .post("/api/v1/lexical/complexity?mode=verbose")
            .send(testdata5)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let testdata6={
        text:'text '.repeat(101)
    }

    it("It should return 400 BAD REQUEST when words are more then 100", function (done) {
        request(app)
            .post("/api/v1/lexical/complexity?mode=verbose")
            .send(testdata6)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});