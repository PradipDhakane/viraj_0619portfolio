var express=require("express");
var exe=require("./../connection");
var url=require("url");
var router=express.Router();

router.get("/",async function(req,res){
    var home_info=await exe(`select * from home_info`);
    var obj={"home_info":home_info[0]}
    res.render("user/home.ejs",obj);
});

router.get("/about",async function(req,res){
    var home_info=await exe(`select * from home_info`);
    var personal_info=await exe(`select * from personal_info`);
    var obj={"home_info":home_info[0],"personal_info":personal_info[0]}
    res.render("user/about.ejs",obj);
});

router.get("/resume",async function(req,res){
    var home_info=await exe(`select * from home_info`);
    var obj={"home_info":home_info[0]}
    res.render("user/resume.ejs",obj);
});
router.get("/contact",async function(req,res){
    var home_info=await exe(`select * from home_info`);
    var personal_info=await exe(`select * from personal_info`);
    var obj={"home_info":home_info[0],"personal_info":personal_info[0]}
    res.render("user/contact.ejs",obj);
});
    router.post("/contact_now",async function(req,res){
        var d=req.body;
        var today_date=new Date();
        var date=new Date().toISOString().slice(0,10).split("-").reverse().join("-");
        var today_time=today_date.getHours();
        var today_min=today_date.getMinutes();
        var sql=`insert into student_info(name,email,subject,message,date,time,min)values('${d.name}','${d.email}','${d.subject}','${d.message}','${date}','${today_time}','${today_min}')`
        var data=await exe(sql)
        res.redirect("/contact")
        
    })

router.get("/portfolio",async function(req,res){
    var home_info=await exe(`select * from home_info`);
    var obj={"home_info":home_info[0]}
    res.render("user/portfolio.ejs",obj);
});
router.post("/admin_login",async function(req,res){
    var d=req.body;
    var sql=`select * from admin_login where email='${d.email}' AND password='${d.password}'`;
    var data=await exe(sql);
    if(data.length>0)
    {
        req.session['admin_id']=data[0].admin_id;
        res.redirect("/admin/");
    }else
    {
        res.redirect("/admin/login");
    }

});
router.get("/logout_admin",function (req,res){
    if(req.session.admin_id==req.session.admin_id){
        res.redirect("/admin/login");
    }
     

})

module.exports=router;

