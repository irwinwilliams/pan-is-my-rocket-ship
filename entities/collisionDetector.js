import { rocket } from '../rocket.js';

export function checkCollision(entity) {
    if (
        rocket.x < entity.x + entity.width &&
        rocket.x + rocket.width > entity.x &&
        rocket.y < entity.y + entity.height &&
        rocket.y + rocket.height > entity.y
    ) {
        return true;
    }
    return false;
}

export function checkCollisionWith(entity1, entity2) {
    if (
        entity2.x < entity1.x + entity1.width &&
        entity2.x + entity2.width > entity1.x &&
        entity2.y < entity1.y + entity1.height &&
        entity2.y + entity2.height > entity1.y
    ) {
        return true;
    }
    return false;
}