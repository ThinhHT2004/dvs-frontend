export const formatRequestId = (id) =>{
    const res = id.toString().padStart(5, '0');

    return `#${res}`
}

export const formatSampleId = (id) =>{
    const res = id.toString().padStart(4, '0');

    return `#DA${res}`;
}

export const formatValuationId = (id) =>{
    const res = id.toString().padStart(4, '0');

    return `#VA${res}`;
}