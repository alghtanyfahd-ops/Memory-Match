// ==========================
// Memory Match Leaderboard API
// ==========================

export async function onRequest(context) {

    const { request, env } = context;


    // جلب المتصدرين
    if(request.method === "GET"){

        try{

            const result =
            await env.DB
            .prepare(
                `
                SELECT 
                name,
                score,
                level
                FROM leaderboard
                ORDER BY score DESC
                LIMIT 10
                `
            )
            .all();


            return Response.json({

                ok:true,

                players: result.results

            });


        }catch(error){

            return Response.json({

                ok:false,

                error:error.message

            },
            {
                status:500
            });

        }

    }



    // إضافة نتيجة
    if(request.method === "POST"){

        try{


            const data =
            await request.json();


            await env.DB
            .prepare(
                `
                INSERT INTO leaderboard
                (
                    name,
                    score,
                    level
                )
                VALUES
                (
                    ?,
                    ?,
                    ?
                )
                `
            )
            .bind(

                data.name,

                data.score,

                data.level

            )
            .run();



            return Response.json({

                ok:true

            });



        }catch(error){


            return Response.json({

                ok:false,

                error:error.message

            },
            {
                status:500
            });


        }

    }



    return new Response(
        "Method not allowed",
        {
            status:405
        }
    );

}
