export const roleName = (roleId: number) => {
    switch (Number(roleId)) {
        case 3:
            return "Admin"    
        default:
            return "PX";
    }
}