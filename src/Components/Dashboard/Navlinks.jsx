import { faCartPlus, faCartShopping, faNewspaper, faTruck, faTruckFast, faTruckMedical, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

export const Links = [
    {
        name: "Users",
        path: "users",
        icons: faUsers,
        role: "1995"

    },
    {
        name :"Add Users",
        path: "/dashboard/user/add",
        icons: faUserPlus,
        role: "1995",
    },
    {
        name :"Categories",
        path: "/dashboard/categories",
        icons: faCartShopping,
        role: ["1995", "1999"],
    },
    {
        name :"Add Category",
        path: "/dashboard/category/add",
        icons: faCartPlus ,
        role: ["1995", "1999"],
    },
    
    {
        name :"Products",
        path: "/dashboard/products",
        icons: faTruckFast ,
        role: ["1995", "1996"]
    },
    {
        name :"Add Products",
        path: "/dashboard/product/add",
        icons: faTruckMedical,
        role: ["1995", "1996"]
    },
    {
        name :"Writer",
        path: "/dashboard/writer",
        icons: faNewspaper,
        role: ["1995", "1996"]
    },
]