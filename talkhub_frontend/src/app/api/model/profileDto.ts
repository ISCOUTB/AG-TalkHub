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


export interface ProfileDto { 
    /**
     * The user\'s id
     */
    id: number;
    /**
     * The user\'s email
     */
    email: string;
    /**
     * The user\'s name
     */
    name: string;
    /**
     * The user\'s role
     */
    role: ProfileDto.RoleEnum;
    /**
     * The user\'s bio
     */
    bio: string;
    /**
     * The user\'s creation date
     */
    creation_date: string;
    /**
     * The time the token was issued
     */
    iat: number;
    /**
     * The time the token expires
     */
    exp: number;
}
export namespace ProfileDto {
    export type RoleEnum = 'admin' | 'regular' | 'moderator';
    export const RoleEnum = {
        Admin: 'admin' as RoleEnum,
        Regular: 'regular' as RoleEnum,
        Moderator: 'moderator' as RoleEnum
    };
}


