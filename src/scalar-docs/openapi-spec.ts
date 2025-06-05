/*
 * --------------------------------------------------------------------------
 * File: openapi-spec.ts
 * Project: car-dano-backend
 * Copyright © 2025 PT. Inspeksi Mobil Jogja
 * --------------------------------------------------------------------------
 * Description: Defines the OpenAPI specification document for the CAR-dano API Gateway.
 * This document describes the available API endpoints, their parameters,
 * responses, and security schemes.
 * --------------------------------------------------------------------------
 */

export const openApiDocument = {
  openapi: '3.0.0',
  info: {
    title: 'CAR-dano API Gateway',
    version: '1.0.0',
    description: 'Public and Developer API for CAR-dano Inspection Data',
  },
  servers: [{ url: `http://localhost:3011` }], // Adjust port if needed
  paths: {},
  tags: [],
  components: {},
};
