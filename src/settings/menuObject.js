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
                    name: 'Sell Return',
                    icon: '',
                    route: '',
                }, {
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
        },{
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
        },{
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

export default menuObject;
