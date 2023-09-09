import { uuid as generateUuid } from 'uuidv4';

interface UserDefinedProperties {
    [key: string]: any;
}

interface SnapshotMetadata {
    snapshotName?: string;
    snapshotDescription?: string;
    tags?: string[];
    author?: string;
    environment?: string;
    version?: string;
    customFields?: { [key: string]: any };
}

export class Equipment {
    uuid: string;
    name: string;
    description: string;
    type: string;
    dateTimeCreated: Date;
    dateTimeUpdated: Date;
    userDefinedProperties: UserDefinedProperties;
    children: Equipment[];
    snapshotMetadata?: SnapshotMetadata;

    constructor(
        name: string,
        type: string,
        description = '',
        userDefinedProperties: UserDefinedProperties = {},
        children: Equipment[] = [],
        uuid?: string,
        dateTimeCreated?: Date,
        dateTimeUpdated?: Date
    ) {
        this.uuid = uuid || generateUuid();
        this.name = name;
        this.description = description;
        this.type = type;
        this.dateTimeCreated = dateTimeCreated || new Date();
        this.dateTimeUpdated = dateTimeUpdated || new Date();
        this.userDefinedProperties = userDefinedProperties;
        this.children = children;
    }

    // Update equipment details
    updateDetails (
        name?: string,
        description?: string,
        type?: string,
        userDefinedProperties?: UserDefinedProperties
    ): void {
        if (name) this.name = name;
        if (description) this.description = description;
        if (type) this.type = type;
        if (userDefinedProperties) this.userDefinedProperties = userDefinedProperties;
        this.dateTimeUpdated = new Date();
    }

    // Add child equipment
    addChild (equipment: Equipment): void {
        this.children.push(equipment);
    }

    // Remove child equipment by UUID
    removeChild (uuid: string): void {
        this.children = this.children.filter((child) => child.uuid !== uuid);
    }

    // Serialize to JSON
    toJSON (): string {
        const obj = {
            uuid: this.uuid,
            name: this.name,
            description: this.description,
            type: this.type,
            dateTimeCreated: this.dateTimeCreated,
            dateTimeUpdated: this.dateTimeUpdated,
            userDefinedProperties: this.userDefinedProperties,
            children: this.children.map(child => child.uuid) // store only uuids of children
        };
        return JSON.stringify(obj, null, 2);
    }

    // Deserialize from JSON
    static fromJSON (json: string): Equipment {
        const obj = JSON.parse(json);
        const equipment = new Equipment(
            obj.name,
            obj.type,
            obj.description,
            obj.userDefinedProperties,
            [], // Initialize children as empty; we'll populate it later
            obj.uuid,
            obj.dateTimeCreated ? new Date(obj.dateTimeCreated) : undefined,
            obj.dateTimeUpdated ? new Date(obj.dateTimeUpdated) : undefined
        );

        // If obj.children is an array of serialized Equipment objects
        if (Array.isArray(obj.children)) {
            equipment.children = obj.children.map((child: any) => Equipment.fromJSON(JSON.stringify(child)));
        }

        return equipment;
    }

    addSnapshotMetadata (metadata: SnapshotMetadata): void {
        this.snapshotMetadata = metadata;
    }

}
