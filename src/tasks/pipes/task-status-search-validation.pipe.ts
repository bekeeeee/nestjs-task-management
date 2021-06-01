import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusSearchValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
  ];
  transform(value: any, metadata: any) {
    if (!value.status) return;

    console.log('value', value);
    console.log('metadata', metadata);

    value.status.toUpperCase();

    return value;
  }
}
