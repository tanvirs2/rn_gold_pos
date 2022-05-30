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
                }, {
                    name: 'Due bill receive',
                    icon: '',
                    route: '',
                },
            ],
        },

        {
            mainMenuLabel: 'Stock Search',
            mainIcon: 'file-tray-full',
            subMenu: [],
        },

        {
            mainMenuLabel: 'Purchase',
            mainIcon: 'cart',
            subMenu: [
                {
                    name: 'New Gold Purchase',
                    icon: '',
                    route: '',
                },
                {
                    name: 'New Gold Purchase List',
                    icon: '',
                    route: '',
                }, {
                    name: 'Old Gold Purchase',
                    icon: '',
                    route: '',
                }, {
                    name: 'Old Gold Purchase List',
                    icon: '',
                    route: '',
                },

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
                },
                {
                    name: 'Product Categories',
                    icon: '',
                    route: 'Product Categories',
                },

            ],
        },{
            mainMenuLabel: 'CRM (Wholesale)',
            mainIcon: 'people',
            subMenu: [
                {
                    name: 'Wholesaler Entry',
                    icon: '',
                    route: 'Sales',
                },
                {
                    name: 'Wholesaler List',
                    icon: '',
                    route: 'List Of Sales',
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
                    name: 'VAT/TAX',
                    icon: '',
                    route: '',
                },
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
                    name: 'Carats',
                    icon: '',
                    route: '',
                },{
                    name: 'Users',
                    icon: '',
                    route: '',
                },

            ],
        },


    ],
};

export default menuObject;
