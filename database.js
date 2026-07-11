const SUPABASE_URL = "https://zydotbjkedlolysabmjh.supabase.co/rest/v1/ ";

const SUPABASE_KEY = "sb_publishable_Vc-oDp7kJXQWGGL35imEUQ_OpYoKpPW";
// ==========================
// Supabase Database
// ==========================

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// إنشاء أو جلب اللاعب
async function loadPlayerData(username) {

    if (!username) return;


    const { data, error } = await supabaseClient
        .from("players")
        .select("*")
        .eq("username", username)
        .single();


    if (data) {

        level = data.level || 1;
        score = data.score || 0;
        coins = data.coins || 0;

        return data;

    }


    // إذا كان لاعب جديد
    const { data: newPlayer, error: createError } =
    await supabaseClient
        .from("players")
        .insert({

            username: username,
            level: 1,
            score: 0,
            coins: 0

        })
        .select()
        .single();


    if (createError) {

        console.error(createError);

        return null;

    }


    return newPlayer;

}



// حفظ تقدم اللاعب
async function savePlayerData(){

    if(!player) return;


    const { error } =
    await supabaseClient
        .from("players")
        .update({

            level: level,
            score: score,
            coins: coins,
            updated_at: new Date()

        })
        .eq("username", player);


    if(error){

        console.error(
            "خطأ حفظ البيانات:",
            error
        );

    }

}
