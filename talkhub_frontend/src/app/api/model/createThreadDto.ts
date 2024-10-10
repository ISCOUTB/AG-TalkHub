/**
 * Talkhub API
 * This is a forum API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface CreateThreadDto { 
    /**
     * The thread\'s title
     */
    title: string;
    /**
     * The thread\'s content
     */
    content: string;
    /**
     * The thread\'s publication date
     */
    publication_date: string;
    /**
     * The thread\'s category
     */
    id_category: number;
    /**
     * The thread\'s user
     */
    id_user: number;
}

