// diff.ts

import { Equipment } from '../models/equipment';
import * as jsonDiff from 'json-diff';

// Function to generate a textual diff between two Equipment objects
export function textualDiff (equipment1: Equipment, equipment2: Equipment): string {
    const json1 = JSON.parse(equipment1.toJSON());
    const json2 = JSON.parse(equipment2.toJSON());

    const diff = jsonDiff.diffString(json1, json2);
    return diff;
}

// Function to generate a graphical diff between two Equipment objects
export function graphicalDiff (equipment1: Equipment, equipment2: Equipment): any {
    // Convert to JSON objects
    const json1 = JSON.parse(equipment1.toJSON());
    const json2 = JSON.parse(equipment2.toJSON());

    // Generate a tree-like diff
    const diffTree = generateDiffTree(json1, json2);

    return diffTree;
}

// Helper function to generate a diff tree
function generateDiffTree (obj1: any, obj2: any, path: string[] = []): any {
    const diffTree: any = {};

    // Loop through all keys in the first object
    for (const key in obj1) {
        const newPath = [...path, key];
        if (typeof obj1[key] === 'object' && obj1[key] !== null && !Array.isArray(obj1[key])) {
            diffTree[key] = generateDiffTree(obj1[key], obj2?.[key], newPath);
        } else {
            diffTree[key] = {
                oldValue: obj1[key],
                newValue: obj2?.[key],
                status: obj2?.hasOwnProperty(key) ? 'modified' : 'removed',
                path: newPath.join('.'),
            };
        }
    }

    // Loop through all keys in the second object to find added keys
    for (const key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            const newPath = [...path, key];
            diffTree[key] = {
                oldValue: null,
                newValue: obj2[key],
                status: 'added',
                path: newPath.join('.'),
            };
        }
    }

    return diffTree;
}
