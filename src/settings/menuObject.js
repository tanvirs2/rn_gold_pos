/*
SignUp
Home
Sales
Invoice
Deposit & Withdraw List
Deposit & Withdraw Entry
Product List
Stock Entry
Expense Entry
Expense List
Product Categories
Product Category Entry
List Of Sales
Product Details Invoice
Due Received
Camera
*/

export const iconMapping = {
    'Home'              : 'home',
    'Sell & Purchase'   : 'reader',
    'Deposit & Withdraw': 'card',
    'Expense'           : 'cash',
    'Inventory'         : 'file-tray-stacked',
    'CRM'               : 'people',
};

export const routeMapping = {
    '/home': [{
        name: 'Home',
        icon: '',
        route: 'Home',
    }],

    '/admin/pos/purchases': [{
        name: 'Purchase Entry',
        icon: '',
        route: 'Purchase Entry',
    }, {
        name: 'Purchase List',
        icon: '',
        route: 'Purchase List',
    }],

    '/admin/pos/sales': [{
        name: 'SaleRetail/Wholesale',
        icon: '',
        route: 'Sales',
    }, {
        name: 'List of sales',
        icon: '',
        route: 'List Of Sales',
    }, ],

    '/admin/pos/duebills': [
        {
            name: 'Due bill receive Entry',
            icon: '',
            route: 'Due Receive Entry',
        },
        {
            name: 'Due bill receive List',
            icon: '',
            route: 'Due Receive List',
        }
    ],

    '/admin/pos/deposits': [
        {
            name: 'Deposit / Withdraw Entry',
            icon: '',
            route: 'Deposit & Withdraw Entry',
        },

    ],

    '/admin/pos/withdraws': [
        {
            name: 'Deposit / Withdraw List',
            icon: '',
            route: 'Deposit & Withdraw List',
        }
    ],

    '/admin/pos/expenses': [
        {
            name: 'Expense Entry',
            icon: '',
            route: 'Expense Entry',
        },
        {
            name: 'Expense List',
            icon: '',
            route: 'Expense List',
        },

    ],

    '/admin/pos/products': [
        {
            name: 'Stock Entry',
            icon: '',
            route: 'Stock Entry',
        },
        {
            name: 'Product List',
            icon: '',
            route: 'Product List',
        }
    ],

    '/admin/pos/product-categories' : [
        {
            name: 'Category Entry',
            icon: '',
            route: 'Product Category Entry',
        },
        {
            name: 'Category List',
            icon: '',
            route: 'Product Categories',
        }
    ],

    '/admin/pos/customers': [
        {
            name: 'Customer Entry',
            icon: '',
            route: 'Customer Entry',
        },
        {
            name: 'Customer List',
            icon: '',
            route: 'Customer List',
        },
        {
            name: 'Users',
            icon: '',
            route: 'Users',
        }
    ],
};

const menuObject3 = {
    menuItems: []
}

const menuObject2 = {
    menuItems: [
        {
            "appMenuId": 0,
            "parentId": null,
            "rightId": null,
            "label": "Sell & Purchase",
            "icon": "inventory",
            "url": null,
            "tooltip": null,
            "widget": null,
            "items": [
                {
                    "appMenuId": 0,
                    "parentId": null,
                    "rightId": null,
                    "label": "Purchase",
                    "icon": "",
                    "url": "/admin/pos/purchases",
                    "tooltip": null,
                    "widget": null,
                    "items": []
                },
                {
                    "appMenuId": 0,
                    "parentId": null,
                    "rightId": null,
                    "label": "Sales",
                    "icon": "",
                    "url": "/admin/pos/sales",
                    "tooltip": null,
                    "widget": null,
                    "items": []
                },
                {
                    "appMenuId": 0,
                    "parentId": null,
                    "rightId": null,
                    "label": "Due Bill",
                    "icon": "",
                    "url": "/admin/pos/duebills",
                    "tooltip": null,
                    "widget": null,
                    "items": []
                }
            ]
        },
        {
            "appMenuId": 0,
            "parentId": null,
            "rightId": null,
            "label": "Deposit & Withdraw",
            "icon": "inventory",
            "url": null,
            "tooltip": null,
            "widget": null,
            "items": [
                {
                    "appMenuId": 0,
                    "parentId": null,
                    "rightId": null,
                    "label": "Deposit",
                    "icon": "",
                    "url": "/admin/pos/deposits",
                    "tooltip": null,
                    "widget": null,
                    "items": []
                },
                {
                    "appMenuId": 0,
                    "parentId": null,
                    "rightId": null,
                    "label": "Withdraw",
                    "icon": "",
                    "url": "/admin/pos/withdraws",
                    "tooltip": null,
                    "widget": null,
                    "items": []
                }
            ]
        },
        {
            "appMenuId": 0,
            "parentId": null,
            "rightId": null,
            "label": "Expense",
            "icon": "inventory",
            "url": null,
            "tooltip": null,
            "widget": null,
            "items": [
                {
                    "appMenuId": 0,
                    "parentId": null,
                    "rightId": null,
                    "label": "Expense List",
                    "icon": "",
                    "url": "/admin/pos/expenses",
                    "tooltip": null,
                    "widget": null,
                    "items": []
                }
            ]
        },
        {
            "appMenuId": 0,
            "parentId": null,
            "rightId": null,
            "label": "Inventory",
            "icon": "inventory",
            "url": null,
            "tooltip": null,
            "widget": null,
            "items": [
                {
                    "appMenuId": 0,
                    "parentId": null,
                    "rightId": null,
                    "label": "Product List",
                    "icon": "inventory",
                    "url": "/admin/pos/products",
                    "tooltip": null,
                    "widget": null,
                    "items": []
                },
                {
                    "appMenuId": 0,
                    "parentId": null,
                    "rightId": null,
                    "label": "Product Category List",
                    "icon": "inventory",
                    "url": "/admin/pos/product-categories",
                    "tooltip": null,
                    "widget": null,
                    "items": []
                }
            ]
        },
        {
            "appMenuId": 0,
            "parentId": null,
            "rightId": null,
            "label": "CRM",
            "icon": "crm",
            "url": null,
            "tooltip": null,
            "widget": null,
            "items": [
                {
                    "appMenuId": 0,
                    "parentId": null,
                    "rightId": null,
                    "label": "Customer List",
                    "icon": "",
                    "url": "/admin/pos/customers",
                    "tooltip": null,
                    "widget": null,
                    "items": []
                }
            ]
        }
    ],
};

//console.log(menuObject2)

const menuObject = {
    menuItems: [
        {
            mainMenuLabel: 'Sell Management',
            mainIcon: 'reader',
            subMenu: [
                {
                    name: 'SaleRetail/Wholesale',
                    icon: '',
                    route: 'Sales',
                },
                {
                    name: 'List of sales',
                    icon: '',
                    route: 'List Of Sales',
                }
            ],
        },

        /*{
            mainMenuLabel: 'Stock Search',
            mainIcon: 'file-tray-full',
            subMenu: [],
        },*/

        {
            mainMenuLabel: 'Due Received',
            mainIcon: 'briefcase',
            subMenu: [
                {
                    name: 'Due bill receive Entry',
                    icon: '',
                    route: 'Due Receive Entry',
                },
                {
                    name: 'Due bill receive List',
                    icon: '',
                    route: 'Due Receive List',
                }
            ],
        },

        {
            mainMenuLabel: 'Purchase',
            mainIcon: 'cart',
            subMenu: [
                {
                    name: 'Purchase Entry',
                    icon: '',
                    route: 'Purchase Entry',
                },
                {
                    name: 'Purchase List',
                    icon: '',
                    route: 'Purchase List',
                }
            ],
        },{
            mainMenuLabel: 'Deposit/Withdraw',
            mainIcon: 'card',
            subMenu: [
                {
                    name: 'Deposit / Withdraw Entry',
                    icon: '',
                    route: 'Deposit & Withdraw Entry',
                },
                {
                    name: 'Deposit / Withdraw List',
                    icon: '',
                    route: 'Deposit & Withdraw List',
                },

            ],
        },{
            mainMenuLabel: 'Expense',
            mainIcon: 'cash',
            subMenu: [
                {
                    name: 'Expense Entry',
                    icon: '',
                    route: 'Expense Entry',
                },
                {
                    name: 'Expense List',
                    icon: '',
                    route: 'Expense List',
                },

            ],
        },{
            mainMenuLabel: 'Inventory',
            mainIcon: 'file-tray-stacked',
            subMenu: [
                {
                    name: 'Stock Entry',
                    icon: '',
                    route: 'Stock Entry',
                },
                {
                    name: 'Product List',
                    icon: '',
                    route: 'Product List',
                }
            ],
        },{
            mainMenuLabel: 'CRM',
            mainIcon: 'people',
            subMenu: [
                {
                    name: 'Customer Entry',
                    icon: '',
                    route: 'Customer Entry',
                },
                {
                    name: 'Customer List',
                    icon: '',
                    route: 'Customer List',
                },

            ],
        }
        /*,{
            mainMenuLabel: 'Report',
            mainIcon: 'newspaper',
            subMenu: [
                {
                    name: 'Daily Report',
                    icon: '',
                    route: '',
                },
                {
                    name: 'Category Wise Report',
                    icon: '',
                    route: '',
                },

            ],
        }*/,
        {
            mainMenuLabel: 'Settings',
            mainIcon: 'settings',
            subMenu: [
                {
                    name: 'Category Entry',
                    icon: '',
                    route: 'Product Category Entry',
                },
                {
                    name: 'Category List',
                    icon: '',
                    route: 'Product Categories',
                },
                {
                    name: 'Users',
                    icon: '',
                    route: 'Users',
                },

            ],
        },


    ],
};

export default menuObject3;
