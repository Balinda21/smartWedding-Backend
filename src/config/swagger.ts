// src/config/swagger.ts
import { type SwaggerOptions } from "swagger-ui-express";

const swaggerDocument: SwaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "Smart Wedding API",
    version: "1.0.0",
    description: "API documentation for Smart Wedding application"
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Development server"
    }
  ],
  tags: [
    {
      name: "Auth",
      description: "Authentication endpoints"
    },
    {
      name: "Venues",
      description: "Venue management endpoints"
    }
  ],
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user (defaults to CLIENT role)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    description: "User's email address"
                  },
                  password: {
                    type: "string",
                    format: "password",
                    description: "User's password"
                  },
                  name: {
                    type: "string",
                    description: "User's full name (optional)"
                  },
                  phoneNumber: {
                    type: "string",
                    description: "User's phone number (optional)"
                  }
                },
                required: ["email", "password"]
              }
            }
          }
        },
        responses: {
          "201": {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      enum: ["success"]
                    },
                    message: {
                      type: "string"
                    },
                    data: {
                      type: "object",
                      properties: {
                        user: {
                          type: "object",
                          properties: {
                            id: {
                              type: "integer"
                            },
                            email: {
                              type: "string"
                            },
                            name: {
                              type: "string",
                              nullable: true
                            },
                            role: {
                              type: "string",
                              enum: ["CLIENT"]
                            },
                            phoneNumber: {
                              type: "string",
                              nullable: true
                            },
                            isActive: {
                              type: "boolean"
                            },
                            verified: {
                              type: "boolean"
                            },
                            createdAt: {
                              type: "string",
                              format: "date-time"
                            },
                            updatedAt: {
                              type: "string",
                              format: "date-time"
                            }
                          }
                        },
                        token: {
                          type: "string"
                        }
                      }
                    }
                  },
                  example: {
                    status: "success",
                    message: "User registered successfully",
                    data: {
                      user: {
                        id: 1,
                        email: "user@example.com",
                        name: "John Doe",
                        role: "CLIENT",
                        phoneNumber: "+1234567890",
                        isActive: true,
                        verified: false,
                        createdAt: "2024-11-29T12:00:00Z",
                        updatedAt: "2024-11-29T12:00:00Z"
                      },
                      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      enum: ["error"]
                    },
                    message: {
                      type: "string"
                    },
                    data: {
                      type: "null"
                    }
                  },
                  example: {
                    status: "error",
                    message: "User already exists",
                    data: null
                  }
                }
              }
            }
          },
          "500": {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      enum: ["error"]
                    },
                    message: {
                      type: "string"
                    },
                    data: {
                      type: "null"
                    }
                  },
                  example: {
                    status: "error",
                    message: "Internal server error",
                    data: null
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    description: "User's email address"
                  },
                  password: {
                    type: "string",
                    format: "password",
                    description: "User's password"
                  }
                },
                required: ["email", "password"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      enum: ["success"]
                    },
                    message: {
                      type: "string"
                    },
                    data: {
                      type: "object",
                      properties: {
                        user: {
                          type: "object",
                          properties: {
                            id: {
                              type: "integer"
                            },
                            email: {
                              type: "string"
                            },
                            name: {
                              type: "string",
                              nullable: true
                            },
                            role: {
                              type: "string",
                              enum: ["CLIENT", "ADMIN", "PHOTOGRAPHER", "VENDOR"]
                            },
                            phoneNumber: {
                              type: "string",
                              nullable: true
                            },
                            isActive: {
                              type: "boolean"
                            },
                            verified: {
                              type: "boolean"
                            }
                          }
                        },
                        token: {
                          type: "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      enum: ["error"]
                    },
                    message: {
                      type: "string"
                    },
                    data: {
                      type: "null"
                    }
                  },
                  example: {
                    status: "error",
                    message: "Invalid credentials",
                    data: null
                  }
                }
              }
            }
          },
          "500": {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      enum: ["error"]
                    },
                    message: {
                      type: "string"
                    },
                    data: {
                      type: "null"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/venues": {
      post: {
        tags: ["Venues"],
        summary: "Create a new venue",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: [
                  "name",
                  "description",
                  "location",
                  "address",
                  "capacity",
                  "price",
                  "depositRequired",
                  "cancellationPolicy",
                  "contactName",
                  "contactEmail",
                  "contactPhone"
                ],
                properties: {
                  name: {
                    type: "string",
                    description: "Name of the venue"
                  },
                  description: {
                    type: "string",
                    description: "Detailed description of the venue"
                  },
                  location: {
                    type: "string",
                    description: "General location/area of the venue"
                  },
                  address: {
                    type: "string",
                    description: "Full address of the venue"
                  },
                  capacity: {
                    type: "integer",
                    description: "Maximum guest capacity"
                  },
                  price: {
                    type: "number",
                    description: "Price per event"
                  },
                  images: {
                    type: "array",
                    items: {
                      type: "string"
                    },
                    description: "Array of image URLs"
                  },
                  amenities: {
                    type: "array",
                    items: {
                      type: "string"
                    },
                    description: "List of available amenities"
                  },
                  features: {
                    type: "array",
                    items: {
                      type: "string"
                    },
                    description: "Special features of the venue"
                  },
                  hasIndoorSpace: {
                    type: "boolean",
                    description: "Whether venue has indoor space"
                  },
                  hasOutdoorSpace: {
                    type: "boolean",
                    description: "Whether venue has outdoor space"
                  },
                  depositRequired: {
                    type: "number",
                    description: "Required deposit amount"
                  },
                  cancellationPolicy: {
                    type: "string",
                    description: "Venue's cancellation policy"
                  },
                  contactName: {
                    type: "string",
                    description: "Contact person's name"
                  },
                  contactEmail: {
                    type: "string",
                    description: "Contact email address"
                  },
                  contactPhone: {
                    type: "string",
                    description: "Contact phone number"
                  }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Venue created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean"
                    },
                    message: {
                      type: "string"
                    },
                    data: {
                      $ref: "#/components/schemas/Venue"
                    }
                  }
                }
              }
            }
          },
          "401": {
            description: "Unauthorized"
          },
          "400": {
            description: "Bad request"
          }
        }
      },
      get: {
        tags: ["Venues"],
        summary: "Get all venues",
        description: "Retrieve a list of all wedding venues",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true
                    },
                    message: {
                      type: "string",
                      example: "Venues retrieved successfully"
                    },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Venue"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: false
                    },
                    message: {
                      type: "string",
                      example: "Internal server error"
                    },
                    data: {
                      type: "null"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },

  
   

    "/api/venues/{id}": {
      get: {
        tags: ["Venues"],
        summary: "Get venue by ID",
        description: "Retrieve a specific venue by its ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            },
            description: "Venue ID"
          }
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true
                    },
                    message: {
                      type: "string",
                      example: "Venue retrieved successfully"
                    },
                    data: {
                      $ref: "#/components/schemas/Venue"
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid ID",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: false
                    },
                    message: {
                      type: "string",
                      example: "Invalid venue ID"
                    },
                    data: {
                      type: "null"
                    }
                  }
                }
              }
            }
          },
          "404": {
            description: "Venue not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: false
                    },
                    message: {
                      type: "string",
                      example: "Venue not found"
                    },
                    data: {
                      type: "null"
                    }
                  }
                }
              }
            }
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: false
                    },
                    message: {
                      type: "string",
                      example: "Internal server error"
                    },
                    data: {
                      type: "null"
                    }
                  }
                }
              }
            }
          }
        }
      },
      put: {
        tags: ["Venues"],
        summary: "Update a venue",
        description: "Update an existing venue by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            },
            description: "Venue ID"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateVenueDTO"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Venue updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true
                    },
                    message: {
                      type: "string",
                      example: "Venue updated successfully"
                    },
                    data: {
                      $ref: "#/components/schemas/Venue"
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid ID"
          },
          "404": {
            description: "Venue not found"
          }
        }
      },
      delete: {
        tags: ["Venues"],
        summary: "Delete a venue",
        description: "Delete a venue by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            },
            description: "Venue ID"
          }
        ],
        responses: {
          "200": {
            description: "Venue deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true
                    },
                    message: {
                      type: "string",
                      example: "Venue deleted successfully"
                    },
                    data: {
                      type: "null"
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid ID"
          },
          "404": {
            description: "Venue not found"
          }
        }
      }
    },
    
"/api/photographers": {
 get: {
   tags: ["Photographers"],
   summary: "Get all photographers",
   description: "Retrieve a list of all wedding photographers",
   responses: {
     "200": {
       description: "Success",
       content: {
         "application/json": {
           schema: {
             type: "object", 
             properties: {
               status: {
                 type: "boolean",
                 example: true
               },
               message: {
                 type: "string",
                 example: "Photographers retrieved successfully"
               },
               data: {
                 type: "array",
                 items: {
                   $ref: "#/components/schemas/Photographer"
                 }
               }
             }
           }
         }
       }
     },
     "500": {
       description: "Server error",
       content: {
         "application/json": {
           schema: {
             type: "object",
             properties: {
               status: {
                 type: "boolean",
                 example: false
               },
               message: {
                 type: "string", 
                 example: "Internal server error"
               },
               data: {
                 type: "null"
               }
             }
           }
         }
       }
     }
   }
 },
 post: {
   tags: ["Photographers"],
   summary: "Create a new photographer",
   security: [{ bearerAuth: [] }],
   requestBody: {
     required: true,
     content: {
       "application/json": {
         schema: {
           type: "object",
           required: [
             "name",
             "email", 
             "phone",
             "location",
             "specialties",
             "price",
             "packages",
             "experience",
             "bio"
           ],
           properties: {
             name: {
               type: "string",
               description: "Photographer's name"
             },
             email: {
               type: "string",
               format: "email",
               description: "Photographer's email"
             },
             phone: {
               type: "string",
               description: "Contact phone number"
             },
             location: {
               type: "string",
               description: "Service area/location"
             },
             specialties: {
               type: "array",
               items: {
                 type: "string"
               },
               description: "Photography specialties"
             },
             portfolio: {
               type: "array",
               items: {
                 type: "string"
               },
               description: "Portfolio image URLs"
             },
             price: {
               type: "number",
               description: "Base price for services"
             },
             packages: {
               type: "array",
               items: {
                 type: "object",
                 properties: {
                   name: {
                     type: "string"
                   },
                   description: {
                     type: "string"
                   },
                   price: {
                     type: "number"
                   },
                   features: {
                     type: "array",
                     items: {
                       type: "string"
                     }
                   }
                 }
               },
               description: "Available photography packages"
             },
             experience: {
               type: "integer",
               description: "Years of experience"
             },
             bio: {
               type: "string",
               description: "Photographer's bio/description"
             }
           }
         }
       }
     }
   },
   responses: {
     "201": {
       description: "Photographer created successfully",
       content: {
         "application/json": {
           schema: {
             $ref: "#/components/responses/PhotographerResponse"
           }
         }
       }
     },
     "400": {
       description: "Bad request"
     },
     "401": {
       description: "Unauthorized"
     }
   }
 }
},
"/api/photographers/{id}": {
 get: {
   tags: ["Photographers"],
   summary: "Get photographer by ID",
   parameters: [
     {
       name: "id",
       in: "path",
       required: true,
       schema: {
         type: "integer"
       },
       description: "Photographer ID"
     }
   ],
   responses: {
     "200": {
       description: "Success",
       content: {
         "application/json": {
           schema: {
             $ref: "#/components/responses/PhotographerResponse"
           }
         }
       }
     },
     "404": {
       description: "Photographer not found"
     }
   }
 }
},
"/api/cakes": {
  post: {
    tags: ["Cakes"],
    summary: "Create a new cake vendor",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Cake" }
        }
      }
    },
    responses: {
      "201": {
        description: "Cake vendor created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "boolean" },
                message: { type: "string" },
                data: { $ref: "#/components/schemas/Cake" }
              }
            }
          }
        }
      }
    }
  },
  get: {
    tags: ["Cakes"],
    summary: "Get all cake vendors",
    responses: {
      "200": {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "boolean" },
                message: { type: "string" },
                data: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Cake" }
                }
              }
            }
          }
        }
      }
    }
  }
},
"/api/cakes/{id}": {
  get: {
    tags: ["Cakes"],
    summary: "Get cake vendor by ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    responses: {
      "200": {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "boolean" },
                message: { type: "string" },
                data: { $ref: "#/components/schemas/Cake" }
              }
            }
          }
        }
      }
    }
  },
  put: {
    tags: ["Cakes"],
    summary: "Update cake vendor",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Cake" }
        }
      }
    },
    responses: {
      "200": {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "boolean" },
                message: { type: "string" },
                data: { $ref: "#/components/schemas/Cake" }
              }
            }
          }
        }
      }
    }
  },
  delete: {
    tags: ["Cakes"],
    summary: "Delete cake vendor",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    responses: {
      "200": {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "boolean" },
                message: { type: "string" },
                data: { type: "null" }
              }
            }
          }
        }
      }
    }
  }
},
"/api/djs": {
  post: {
    tags: ["DJs"],
    summary: "Create a new DJ",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/DJ" }
        }
      }
    },
    responses: {
      "201": {
        description: "DJ created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "boolean" },
                message: { type: "string" },
                data: { $ref: "#/components/schemas/DJ" }
              }
            }
          }
        }
      }
    }
  },
  get: {
    tags: ["DJs"],
    summary: "Get all DJs",
    responses: {
      "200": {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "boolean" },
                message: { type: "string" },
                data: {
                  type: "array",
                  items: { $ref: "#/components/schemas/DJ" }
                }
              }
            }
          }
        }
      }
    }
  }
},
"/api/djs/{id}": {
  get: {
    tags: ["DJs"],
    summary: "Get DJ by ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    responses: {
      "200": {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "boolean" },
                message: { type: "string" },
                data: { $ref: "#/components/schemas/DJ" }
              }
            }
          }
        }
      }
    }
  },
  put: {
    tags: ["DJs"],
    summary: "Update DJ",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/DJ" }
        }
      }
    },
    responses: {
      "200": {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "boolean" },
                message: { type: "string" },
                data: { $ref: "#/components/schemas/DJ" }
              }
            }
          }
        }
      }
    }
  },
  delete: {
    tags: ["DJs"],
    summary: "Delete DJ",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    responses: {
      "200": {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "boolean" },
                message: { type: "string" },
                data: { type: "null" }
              }
            }
          }
        }
      }
    }
  }
}
}
};

export default swaggerDocument;