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


export interface CreateCommentDto { 
    /**
     * The comment\'s content
     */
    content: string;
    /**
     * The comment\'s publication date
     */
    publication_date: string;
    /**
     * The comment\'s thread
     */
    id_thread: number;
    /**
     * The comment\'s user
     */
    id_user?: number;
}
