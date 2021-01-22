export const UserAction = {
    CHANGE_FILTER: 'CHANGE_FILTER',
    NEXT_PAGE: 'NEXT_PAGE',
    PREV_PAGE: 'PREV_PAGE',
    SEACRCH: 'SEACRCH',
};

export const UpdateType = {
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    FILTER: 'FILTER',
};

export const Param = {
    SORT_FIELD: 'sort_field',
    SORT_DIRECTION: 'sort_direction',
    SEACRCH: 'search',
    PAGE: 'page',
    PREV_PAGE: 'previous_page_url',
    NEXT_PAGE: 'next_page_url',
    CURRENT_PAGE: 'current_page'
}

export const ParamValue = {
    ASC: 'asc',
    DESC: 'desc',
    NAME: 'name',
    PRICE: 'price',
}

export const DefaultRequestParams = {
    [Param.SORT_FIELD]: ParamValue.NAME,
    [Param.SORT_DIRECTION]: ParamValue.ASC,
    [Param.PAGE]: 1,
}

export const searchFieldDataDefault = {
    name: 'searchField',
    placeholder: 'Поиск по товарам',
    value: ''
}

export const sortByFieldSelectDataDefault = {
    name: 'sortByField',
    options: [
        {
            name: 'По названию',
            value: 'name',
        },
        {
            name: 'По цене',
            value: 'price'
        },
    ]
}

export const sortByDirectionSelectDataDefault = {
    name: 'sortByDirection',
    options: [
        {
            name: 'По возрастанию',
            value: 'asc'
        },
        {
            name: 'По убыванию',
            value: 'desc'
        },
    ]
}