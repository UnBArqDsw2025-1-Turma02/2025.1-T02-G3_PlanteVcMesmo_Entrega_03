import { PlantRepository } from '@/application/repositories';
import { DataSource, Repository } from 'typeorm';
import { PlantEntity } from '@/infra/orm/entities';
import { CalendarPlant } from '@/domain';


export class PlantOrmRepository implements PlantRepository {
  private readonly repo: Repository<CalendarPlant>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(PlantEntity);
  }

  public async list(
    input: PlantRepository.List.Input,
  ): Promise<PlantRepository.List.Output> {
    const queryBuilder = this.repo.createQueryBuilder('plant');

    if (input.filter?.ids) {
      queryBuilder.andWhere('plant.id IN (:...ids)', { ids: input.filter.ids });
    }

    if (input.filter?.names) {
      queryBuilder.andWhere('plant.plantName IN (:...names)', {
        names: input.filter.names,
      });
    }

    if (input.filter?.state) {
      queryBuilder.andWhere('plant.state = :state', {
        state: input.filter.state,
      });
    }

    const page = input.pagination?.page ?? 0;
    const limit = input.pagination?.limit ?? 10;

    const [plants, total] = await queryBuilder
      .skip(page * limit)
      .take(limit)
      .getManyAndCount();

    return {
      plants,
      total,
    };
  }
}