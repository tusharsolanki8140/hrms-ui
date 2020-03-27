export const MainNav = [
    {
        icon: 'pe-7s-rocket',
        label: 'Dashboard',
        to: '#/dashboards/basic',
    },
    {
        icon: 'pe-7s-users',
        label: 'HR',
        content:[
            {
                label: 'Employees',
                to: '/#/hr/employees'
            },
            {
                label: 'Organizations',
                to: '/#/hr/organizations'
            }
        ]
    }
];