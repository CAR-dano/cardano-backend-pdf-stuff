import { Controller, Get, Param, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { InspectionsService } from './inspections.service';
import { InspectionResponseDto } from './dto/inspection-response.dto';
import { InspectionChangeLogResponseDto } from './dto/inspection-change-log-response.dto';
import { InspectionChangeLog } from '@prisma/client';

@ApiTags('Inspection Data')
@Controller('inspections')
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}
  /**
   * Handles the retrieval of a specific inspection by ID.
   * [GET /inspections/:id]
   * Retrieves a specific inspection by ID, applying role-based visibility rules.
   * @param id The UUID of the inspection to retrieve.
   * @param userRole Optional role to filter inspection visibility by.
   * @returns A promise that resolves to the inspection record summary.
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a specific inspection by ID',
    description:
      'Retrieves a specific inspection by ID, applying role-based visibility rules.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'The UUID of the inspection to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'The inspection record summary.',
    type: InspectionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Inspection not found.' })
  async findOne(@Param('id') id: string): Promise<InspectionResponseDto> {
    const inspection = await this.inspectionsService.findOne(id);
    return new InspectionResponseDto(inspection);
  }

  /**
   * Retrieves change logs for a specific inspection.
   * Restricted to ADMIN and REVIEWER roles only.
   *
   * @param inspectionId The ID of the inspection.
   * @returns A promise that resolves to an array of InspectionChangeLog objects.
   * @throws UnauthorizedException if the user is not authenticated.
   * @throws ForbiddenException if the user does not have the required role.
   * @throws NotFoundException if the inspection is not found.
   */
  @Get(':id/changelog')
  @ApiOperation({
    summary: 'Get inspection change log',
    description: 'Retrieves the change log entries for a specific inspection.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the inspection',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved inspection change log.',
    type: [InspectionChangeLogResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Inspection not found.',
  })
  async findChangesByInspectionId(
    @Param('id') inspectionId: string,
  ): Promise<InspectionChangeLog[]> {
    return this.inspectionsService.findChangesByInspectionId(inspectionId);
  }
}
