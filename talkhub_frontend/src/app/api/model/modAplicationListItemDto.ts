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
import { ModAplicationListItemUserDto } from './modAplicationListItemUserDto';


export interface ModAplicationListItemDto { 
    /**
     * The modaplication\'s id
     */
    id_modaplication: number;
    /**
     * The aplicant
     */
    user: ModAplicationListItemUserDto;
    /**
     * The modaplication\'s date
     */
    date: string;
    /**
     * The aplication\'s reason
     */
    reason: string;
}
