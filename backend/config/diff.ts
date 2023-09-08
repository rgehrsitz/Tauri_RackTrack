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

    // Use jsonDiff to generate the diff
    const diff = jsonDiff.diff(json1, json2);

    // Convert the diff to a more graphical-friendly format
    const graphicalFriendlyDiff = convertToGraphicalFriendlyFormat(diff, json1);

    return graphicalFriendlyDiff;
}

// Helper function to convert the diff to a more graphical-friendly format
function convertToGraphicalFriendlyFormat (diff: any, original: any = {}): any {
    const graphicalFriendlyDiff: any = {};

    if (!diff || !original) return graphicalFriendlyDiff;

    for (const key in diff) {
        if (diff[key] && typeof diff[key] === 'object') {
            graphicalFriendlyDiff[key] = convertToGraphicalFriendlyFormat(diff[key], original[key] || {});
        } else {
            const status = original && original.hasOwnProperty(key) ? 'modified' : 'added';
            graphicalFriendlyDiff[key] = {
                oldValue: original ? original[key] : null,
                newValue: diff[key],
                status: status,
            };
        }
    }

    // Check for removed keys
    for (const key in original) {
        if (original && !diff.hasOwnProperty(key)) {
            graphicalFriendlyDiff[key] = {
                oldValue: original[key],
                newValue: null,
                status: 'removed',
            };
        }
    }

    return graphicalFriendlyDiff;
}

