import { LabelRepository } from '@/application/repositories';
import { DataSource, Repository } from 'typeorm';
import { LabelEntity } from '@/infra/orm/entities';
import { Label } from '@/domain';

export class LabelOrmRepository implements LabelRepository {
  private readonly repo: Repository<Label>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(LabelEntity);
  }

  public async list(
    input: LabelRepository.List.Input,
  ): Promise<LabelRepository.List.Output> {
    const queryBuilder = this.repo.createQueryBuilder('label');

    if (input.filter?.ids?.length) {
      queryBuilder.andWhere('label.id IN (:...ids)', { ids: input.filter.ids });
    }

    if (input.filter?.names?.length) {
      queryBuilder.andWhere('label.name IN (:...names)', {
        names: input.filter.names,
      });
    }

    const [labels, total] = await queryBuilder
      .skip((input.pagination?.page || 0) * (input.pagination?.limit || 10))
      .take(input.pagination?.limit || 10)
      .getManyAndCount();

    return {
      labels,
      total,
    };
  }
}
