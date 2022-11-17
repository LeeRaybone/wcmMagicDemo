import { DateTime } from 'luxon';

export type WcmUser = {
    userId?: string;
    admin?: boolean;
    createdAt?: DateTime;
    dateJoined?: DateTime;
    name?: string;
    email?: string;
    fullMember?: boolean;
};

export type WcmEvent = {
    date: DateTime;
    description?: string;
    imageFilename?: string;
    lecture?: boolean;
    linkText?: string;
    linkUrl?: string;
    openNight?: boolean;
    theme?: string;
    title: string;
    visitors?: boolean;
};

export type WcmEventYear = {
    year: number;
    events: WcmEvent[];
};

export type WcmMagician = {
    name: string;
    website1?: string;
    website2?: string;
    imageFilename?: string;
};
