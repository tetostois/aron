import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationMetaDto {
  @ApiProperty({
    example: 100,
    description: 'Nombre total d\'éléments',
    type: 'integer'
  })
  total: number;

  @ApiProperty({
    example: 1,
    description: 'Numéro de la page actuelle',
    type: 'integer'
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Nombre d\'éléments par page',
    type: 'integer'
  })
  pageSize: number;

  @ApiProperty({
    example: 10,
    description: 'Nombre total de pages disponibles',
    type: 'integer'
  })
  totalPages: number;

  @ApiProperty({
    example: true,
    description: 'Indique s\'il y a une page suivante',
    type: 'boolean'
  })
  hasNextPage: boolean;

  @ApiProperty({
    example: false,
    description: 'Indique s\'il y a une page précédente',
    type: 'boolean'
  })
  hasPreviousPage: boolean;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Tableau des éléments de la page actuelle',
    isArray: true
  })
  data: T[];

  @ApiProperty({
    type: PaginationMetaDto,
    description: 'Métadonnées de pagination'
  })
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  constructor(partial: Partial<PaginatedResponseDto<T>>) {
    Object.assign(this, partial);
  }

  static create<T>(
    data: T[],
    meta: {
      total: number;
      page: number;
      pageSize: number;
    },
  ): PaginatedResponseDto<T> {
    const totalPages = Math.ceil(meta.total / meta.pageSize);
    
    return new PaginatedResponseDto<T>({
      data,
      meta: {
        total: meta.total,
        page: meta.page,
        pageSize: meta.pageSize,
        totalPages,
        hasNextPage: meta.page < totalPages,
        hasPreviousPage: meta.page > 1,
      },
    });
  }
}
