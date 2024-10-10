import { Injectable } from '@nestjs/common';
import { Repository } from 'src/repository';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadDto } from './dto/thread.dto';

@Injectable()
export class ThreadsService extends Repository<
  ThreadDto,
  CreateThreadDto,
  UpdateThreadDto
> {}
