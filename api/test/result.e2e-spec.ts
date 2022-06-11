import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ResultModule } from './../src/domain/result/result.module';
import { CreateManyDto } from '@nestjsx/crud';
import { Result } from '../src/domain/result/result.entity';
import { SSRStatus } from '../src/constant';

describe('ResultController (e2e)', () => {
  let app: INestApplication;
  let server: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ResultModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();

    // jest.setTimeout(10000); // increase an estimated time (timeout) when loading or fetching huge data.
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. /results/:id, GET [compare the id of fetched object]', (done) => {
    request(server)
      .get('/results/1')
      .expect(200)
      .end((_, res) => {
        const firstFindings = res.body;
        // console.debug('ssr', firstFindings);
        expect(1).toEqual(firstFindings.id);
        done();
      });
  });

  it('2. /results, GET [check if there were any records of Security Scan Result]', (done) => {
    request(server)
      .get('/results')
      .expect(200)
      .end((_, res) => {
        const list = res.body;
        expect(list.length).toBeGreaterThan(0);
        done();
      });
  });

  it('3. /results, POST [create a new record of Security Scan Result]', (done) => {
    const mockData = `{"repositoryName":"Jest Repo","findings":[{"type":"sast","ruleId":"F401","location":{"path":"connectors/apigateway.go","positions":{"begin":{"line":60}}},"metadata":{"description":"TLS InsecureSkipVerify set true.","severity":"LOW"}},{"type":"sast","ruleId":"F402","location":{"path":"util/util.go","positions":{"begin":{"line":32}}},"metadata":{"description":"Use of weak random number generator (math/rand instead of crypto/rand)","severity":"LOW"}}]}`;
    const data: Result = JSON.parse(mockData);
    request(server)
      .post('/results')
      .send(data)
      .expect(201) // "Created"
      .end((_, res) => {
        const obj = res.body;
        // console.debug('obj', obj);
        expect(obj).toHaveProperty('findings');
        done();
      });
  });

  it('4. /results/bulk, POST [create a bulk of records of Security Scan Result]', (done) => {
    const mockData1 = `{"repositoryName":"Jest-bulk1 Repo","findings":[{"type":"sast","ruleId":"F401","location":{"path":"connectors/apigateway.go","positions":{"begin":{"line":60}}},"metadata":{"description":"TLS InsecureSkipVerify set true.","severity":"LOW"}},{"type":"sast","ruleId":"F402","location":{"path":"util/util.go","positions":{"begin":{"line":32}}},"metadata":{"description":"Use of weak random number generator (math/rand instead of crypto/rand)","severity":"LOW"}}]}`;
    const mockData2 = `{"repositoryName":"Jest-bulk2 Repo","findings":[{"type":"sast","ruleId":"F401","location":{"path":"connectors/apigateway.go","positions":{"begin":{"line":60}}},"metadata":{"description":"TLS InsecureSkipVerify set true.","severity":"LOW"}},{"type":"sast","ruleId":"F402","location":{"path":"util/util.go","positions":{"begin":{"line":32}}},"metadata":{"description":"Use of weak random number generator (math/rand instead of crypto/rand)","severity":"LOW"}}]}`;
    //There will be this type bulk: T[]; underneath
    const bulkDto: CreateManyDto<Result> = {
      bulk: [JSON.parse(mockData1), JSON.parse(mockData2)],
    };

    request(server)
      .post('/results/bulk')
      .send(bulkDto)
      .expect(201) // "Created"
      .end((_, res) => {
        const bulk = res.body;
        // console.debug('bulk', bulk);
        expect(bulk.length).toBeGreaterThan(0);
        done();
      });
  });

  it('5. /results/:id, PATCH [update partially a record of Security Scan Result]', (done) => {
    const data: Partial<Result> = {
      status: SSRStatus.SUCCESS,
      repositoryName: 'Updated CC Repo',
    };
    request(server)
      .patch('/results/1')
      .send(data)
      .expect(200)
      .end((_, res) => {
        const obj = res.body;
        console.debug('updated', obj);
        expect(obj.repositoryName).toEqual('Updated CC Repo');
        done();
      });
  });

  it('6. /results/:id, PUT [update entirely a record of Security Scan Result]', (done) => {
    //Note that, I just pick some feilds for convenience, however referring to PUT specficication, it should consist of all feilds except id
    const data: Pick<Result, 'id' | 'status' | 'repositoryName' | 'queuedAt'> =
      {
        id: 1,
        status: SSRStatus.QUEUED,
        repositoryName: 'In Progress Repo',
        queuedAt: new Date(),
      };
    request(server)
      .put('/results/1')
      .send(data)
      .expect(200)
      .end((_, res) => {
        const obj = res.body;
        console.debug('updated', obj);
        expect(obj.repositoryName).toEqual('In Progress Repo');
        done();
      });
  });

  it('7. /results/:id, DELETE [remove a specific record of Security Scan Result]', (done) => {
    request(server)
      .delete('/results/3') //If your database/table does not contain this id:2, just change it to whatever id
      .expect(200)
      .end((_, res) => {
        const deleted = res.body;
        console.debug('deleted', deleted);
        expect(deleted).toEqual({}); //This specific record has been removed, return empty
        done();
      });
  });

  it('8. /results/:id, DELETE [remove not existing record of Security Scan Result] (negative test)', (done) => {
    request(server)
      .delete('/results/3') //If your database/table contains this id:2, just change it to whatever id
      .expect(404)
      .end((_, res) => {
        const msg = res.body;
        console.debug('nothing', msg);
        expect(msg.error).toEqual('Not Found'); //Nested message from { statusCode: 404, message: 'Result not found', error: 'Not Found' }
        done();
      });
  });

  it('9. /results/foobar, POST [should not be reachable] (negative test)', (done) => {
    request(server)
      .post('/results/foobar')
      .send({})
      .end((_, res) => {
        expect(res.status).toBe(404);
        done();
      });
  });
});
