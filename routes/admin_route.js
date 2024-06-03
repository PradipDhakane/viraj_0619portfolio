var express=require("express");
var exe=require("./../connection.js");
var router=express.Router();

const checkLogin = function (req,res,next){
    req.session.admin_id=req.session.admin_id;
    if (req.session.admin_id === undefined || !req.session.admin_id) {
        res.redirect("/admin/login");
    }else{
        next();
    }
}

router.get("/",checkLogin,function(req,res){
    res.render("admin/home.ejs");
});
router.get("/login",function (req,res){
    res.render("admin/login.ejs");
})
router.get("/home_info",checkLogin,async function (req,res){
    var home_info=await exe(`select * from home_info`);
    var obj={"home_info":home_info[0]}
    res.render("admin/home_info.ejs",obj);
});
router.post("/update_home_information",checkLogin,async function(req,res){
    var d=req.body;
    // var sql=`insert into home_info(your_name , facebook_link , whatsapp_link , instagram_link , linkedin_link ) values('${d.your_name}','${d.facebook_link}','${d.whatsapp_link}','${d.instagram_link}','${d.linkedin_link}')`
    
    var sql=`UPDATE home_info SET your_name ='${d.your_name}',
    facebook_link ='${d.facebook_link}',
    whatsapp_link ='${d.whatsapp_link }',
    instagram_link ='${d.instagram_link}', 
    linkedin_link ='${d.linkedin_link}'`;
    var data=await exe(sql); 
    res.redirect("/admin/")
})
router.get("/personal_info",checkLogin,async function (req,res){
    var personal_info=await exe(`select * from personal_info`);
    var obj={"personal_info":personal_info[0]};
    res.render("admin/personal_info.ejs",obj);
})
router.post("/update_personal_information",checkLogin,async function (req,res){
    var d=req.body;
    if(req.files){
        var file_name=new Date().getTime()+".png";
        req.files.your_photo.mv("public/uploads/"+file_name);
        var sql2=`update personal_info set your_photo='${file_name}' where personal_info_id =1`;
        var data2=await exe(sql2);     
    }
    var sql=`UPDATE personal_info SET your_photo ='${file_name}',
    your_dob ='${d.your_dob}',
    your_age ='${d.your_age }',
    your_website ='${d.your_website}', 
    your_deg ='${d.your_deg}',
    your_mobile ='${d.your_mobile}',
    your_email ='${d.your_email}',
    your_city ='${d.your_city}',
    your_country ='${d.your_country}'
    WHERE personal_info_id= '1'`;
    var data=await exe(sql); 
    res.redirect("/admin/");
})
router.get("/user_info",checkLogin,async function (req,res){
    var user_info=await exe(`select * from student_info`);
    var obj={"user_info":user_info};
    res.render("admin/user_info.ejs",obj);
});
router.get("/delete_user_info/:id",async function(req,res){
    var sql=`DELETE FROM student_info WHERE student_info_id='${req.params.id}'`
    var data=await exe(sql);
    res.redirect("/admin/user_info");

});

router.get("/logout_admin",function (req,res){
    req.session.business_id==undefined;
    res.redirect("/admin/login");
    
})

module.exports=router;
