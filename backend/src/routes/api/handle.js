import { Router } from 'express';
import UserModel from '../../models/User';
import mongoose from 'mongoose';
import User from '../../models/User';

const router = Router();




router.post('/login', async function (req, res) {
  try {


    await UserModel.findOne({ 'name': req.body.username }, function (err, user) {
      if (req.body.isRegister) {
        if (user) {

          res.send({ type: "error", message: `Username "${user.name}" has already been used!` })

        } else {
          const newuser = new UserModel({
            name: req.body.username,
            pet: 0,
            password: req.body.password,

          })
          newuser.save();
          res.send({ type: "success", user: newuser, message: `Welcome New User: ${newuser.name}` })
        }

      } else {
        if (user) {
          if (user.password === req.body.password)
            res.send({ type: "success", user, message: `User ${user.name} Login!` })
          else
            res.send({ type: "error", message: "Wrong Password" })
        } else {

          res.send({ type: "error", message: `User ${req.body.username} doesn't exist!` })
        }
      }
    })

  } catch (e) {
    res.send({ message: `Something went wrong... ${e}` });
  }
});



router.post("/set-pet", async function (req, res) {
  await UserModel.findOne({ 'name': req.body.username }, function (err, user) {
    try {
      if (user) {
        user.pet = req.body.pet
        user.petname = req.body.petname
        user.save()
        res.send({ type: "success", user, message: `Successfully choosing your pet!` })
      } else {
        res.send({ type: "error", message: `User not exist!` })
      }

    } catch (e) {
      res.send({ type: "error", message: `Something went wrong... ${e}` })
    }
  })

});


router.post("/add-event", async function (req, res) {
  await UserModel.findOne({ name: req.body.username }, function (err, result) {
    try {
      if (result) {
        
        result.events.push({
          color: req.body.color,
          compSec: req.body.compSec,
          date: req.body.date,
          tag: req.body.tag,
          time: req.body.time,
        })
        result.save();
        res.send({ type: "success", message: `Add event ${req.body.tag} successful`, user: result })
      }
      else
        res.send({ type: "error", message: `weird... no user data: ${req.body.username} . Please re-login.` })
    } catch (e) {
      res.send({ message: `Something went wrong... ${e}` });
    }
  })
})

router.post("/remove-event", async function (req, res) {
  await UserModel.findOne({ name: req.body.username }, function (err, result) {
    try {
      
      if (result) {
        result.events = result.events.filter(e => e._id.valueOf() != req.body.event_id)
        result.save().then(
          e => { res.send({ type: "success", message: `Remove event successful`, user:result}) }
        )
      }
      else
        res.send({  message: `weird... no user data: ${req.body.username} . Please re-login.` })
    } catch (e) {
      res.send({ type: "error",message: `Something went wrong... ${e}` });
    }
  })
})


router.post("/add-goal", async function (req, res) {
  await UserModel.findOne({ name: req.body.username }, function (err, result) {
    try {
      if (result) {
        result.goals.push({
          name: req.body.name,
        })
        result.save().then(e => {
          res.send({ type: "success", message: `Goal ${req.body.name} set!`, user: result })
        })
      }
      else
        res.send({ type: "error", message: `weird... no user data: ${req.body.username} . Please re-login.` })
    } catch (e) {
      res.send({ message: `Something went wrong... ${e}` });
    }
  })
})

router.post("/remove-goal", async function (req, res) {
  await UserModel.findOne({ name: req.body.username }, function (err, result) {
    try {
      if (result) {
        result.goals = result.goals.filter(e => e._id.valueOf() != req.body.goal_id)
        result.save().then(
          e => { res.send({ type: "success", message: `Remove goal successful`, user: result }) }
        )
      }
      else
        res.send({ type: "error", message: `weird... no user data: ${req.body.username} . Please re-login.` })
    } catch (e) {
      res.send({ message: `Something went wrong... ${e}` });
    }
  })
})

router.post("/add-task", async function (req, res) { //username goal_id name
  await UserModel.findOne({ name: req.body.username }, function (err, result) {
    try {
      if (result) {
        if (req.body.goal_id) {
          var currentgoal = result.goals.findIndex(e => e._id == req.body.goal_id)
          result.goals[currentgoal].subs.push({ finish: false, name: req.body.name ,_id: new mongoose.Types.ObjectId})
          result.save().then(
            e => { res.send({ type: "success", message: `Add task ${req.body.name} successful`, user: result }) }
          )
        } else {
          result.tasks.push({ finish: false, name: req.body.name })
          result.save().then(
            e => { res.send({ type: "success", message: `Add task ${req.body.name} successful`, user: result }) }
          )
        }
      }
      else
        res.send({ type: "error", message: `weird... no user data: ${req.body.username} . Please re-login.` })

    } catch (e) {
      res.send({ message: `Something went wrong... ${e}` });
    }
  }
  )
}
)

router.post("/modify-task", async function (req, res) { //username goal_id task_id
  await UserModel.findOne({ name: req.body.username }, function (err, result) {
    try {
  
      if (result) {
        if (req.body.goal_id) {
          var currentgoal = result.goals.findIndex(e => e._id == req.body.goal_id)
          var currenttask= result.goals[currentgoal].subs.findIndex(e=>e._id==req.body.task_id)
          result.goals[currentgoal].subs[currenttask].finish=!(result.goals[currentgoal].subs[currenttask].finish)
          result.markModified('goals');
          result.save().then(
            e => { res.send({ type: "success", message: `Modify task ${req.body.name} successful`, user: result }) }
          )
        } else {
          var currenttask= result.tasks.findIndex(e=>e.id==req.body.task_id)
          result.tasks[currenttask].finish=!(result.tasks[currenttask].finish)
          result.save().then(
            e => { res.send({ type: "success", message: `Modify task ${req.body.name} successful`, user: result }) }
          )
        }
      }
      else
        res.send({ type: "error", message: `weird... no user data: ${req.body.username} . Please re-login.` })

    } catch (e) {
      res.send({ message: `Something went wrong... ${e}` });
    }
  }
  )

}
)

router.post("/remove-task", async function (req, res) { //username goal_id task_id
  await UserModel.findOne({ name: req.body.username }, function (err, result) {
    try {
      if (result) {
        result.tasks=result.tasks.filter(e=>!(e.finish))
        var temp=[]
        for (var i=0;i<result.goals.length;i++){
          for(var j=0;j<result.goals[i].subs.length;j++){
            if(result.goals[i].subs[j].finish){
              temp.push(j)
            }
          }
          temp.reverse()
          temp.forEach(e=>result.goals[i].subs.splice(e,1))
          temp=[]
        }
        result.markModified('goals');
        result.save().then(
          e => { res.send({ type: "success", message: `All finished have been cleared!`, user: result }) }
        )
      }
      else
        res.send({ type: "error", message: `weird... no user data: ${req.body.username} . Please re-login.` })

    } catch (e) {
      res.send({ message: `Something went wrong... ${e}` });
    }
  }
  )

}
)

router.post("/update-focustime", async function (req, res) { //username new_time
  await User.findOne({ name: req.body.username }, (err, result) => {
    try {
      if (result) {
        result.focusedTime = req.body.new_time
        result.save().then((e) => {
          res.send({ type: "success", message: `Congrats! One more slot finished!`,user: result })
        })
      } else {
        res.send({ type: "error", messsage: `weird... no user data: ${req.body.username} . Please re-login.`})
      }
    } catch (e) {
      res.send({ message: `Something went wrong... ${e}` })
    }
  })
})

router.post("/pet-evolution", async function (req, res) { //username new_pet
  await User.findOne( { name: req.body.username }, (err, result) => {
    try {
      if (result) {
        result.pet = req.body.new_pet
        result.save().then((e) => {
          res.send({ type: 'success', message: 'Look! Your pet has elevated to a higher level!', user: result})
        })
      } else {
        res.send({ type: "error", messsage: `weird... no user data: ${req.body.username} . Please re-login.`})
      }
    } catch (e) {
      res.send({ message: `Something went wrong... ${e}` })
    }
  })
})



export default router;
