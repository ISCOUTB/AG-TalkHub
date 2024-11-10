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
import { CommentListItemThreadDto } from './commentListItemThreadDto';
import { CommentListItemUserDto } from './commentListItemUserDto';


export interface CommentListItemDto { 
    /**
     * The comment\'s id
     */
    id_comment: number;
    /**
     * The comment\'s content
     */
    content: string;
    /**
     * The comment\'s publication date
     */
    publication_date: string;
    /**
     * The comment\'s user
     */
    user: CommentListItemUserDto;
    /**
     * The comment\'s thread
     */
    thread: CommentListItemThreadDto;
}

