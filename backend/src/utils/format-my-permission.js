const { getAccessItemHierarchy } = require("./get-access-item-hierarchy");

const formatMyPermission = (permissions) => {
    const menuList = ["menu", "menu-screen"];
    const menus = permissions.filter(p => menuList.includes(p.type));
    const hierarchialMenus = getAccessItemHierarchy(menus);
    const uis = permissions.filter(p => p.type !== "api");
    const apis = permissions.filter(p => p.type === "api");

    return {
        hierarchialMenus,
        uis,
        apis
    }
}

module.exports = { formatMyPermission };