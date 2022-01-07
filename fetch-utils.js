const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwNzU3MywiZXhwIjoxOTU1MDgzNTczfQ.ItAD5AYhCLq3yVOxHVfShkrOdhiFsmpg3uT9tBIISV0';
const SUPABASE_URL = 'https://nhbazqqortcneqwecrjp.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}



export async function getShoppingList() {
    const response = await client
        .from('shopLists')
        .select();

    return checkError(response);
}
export async function newItem(quantity, item) {
    const response = await client
        .from('shopLists')
        .insert([{ quantity, item }]);

    return checkError(response);
}
export async function buyItem() {
    const response = await client
        .from('shopLists')
        .update([{ bought: true }]);

    return checkError(response);

}
export async function deleteAllItems() {
    const response = await client
        .from('shopLists')
        .delete();

    return checkError(response);
}




export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./shop');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    // eslint-disable-next-line no-console
    return error ? console.error(error) : data;
}
