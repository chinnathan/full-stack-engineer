import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Result } from './result.entity';
import { ResultService } from './result.service';

@Crud({
  model: {
    type: Result,
  },
})
@Controller('results')
export class ResultController {
  constructor(public service: ResultService) {}
}
