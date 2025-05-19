import moment from "moment";
import { toast, Bounce } from "react-toastify";

export const inputFied=[
    {
        id:1,
        name:"email",
        place:"Email Address"
    },
    {
        id:2,
        name:"fullName",
        place:"Full Name"
    },
    {
        id:3,
        name:"password",
        place:"Password"
    }
]
export const SucessToast = (msg = "sucess msg missing" , positon = "top-right") => {
    toast.success(msg, {
      position: positon,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
export const timeSet=()=> {
    return moment().format("MM DD YYYY, h:mm:ss a")
  }
export const GroupList=[
{
    id:1,
    grouphead: "Friends Reunion",
    grouptext:"Hi Guys, Wassup!",
    Btn:"Join"
},
{
    id:2,
    grouphead: "Friends Reunion",
    grouptext:"Hi Guys, Wassup!",
    Btn:"Join"
},
{
    id:3,
    grouphead: "Friends Reunion",
    grouptext:"Hi Guys, Wassup!",
    Btn:"Join"
},
]

    export const UserLists=[
        {
            id:1,
            grouphead: "Raghav",
            grouptext:"Dinner?",
            Btn:"+"
        },
        {
            id:2,
            grouphead: "Raghav",
            grouptext:"Dinner?",
            Btn:"+"
        },
        {
            id:3,
            grouphead: "Raghav",
            grouptext:"Dinner?",
            Btn:"+"
        },
        {
            id:4,
            grouphead: "Raghav",
            grouptext:"Dinner?",
            Btn:"+"
        },
        ]
      
            export const BlockedUsers=[
                {
                    id:1,
                    grouphead: "Raghav",
                    grouptext:"Dinner?",
                    Btn:"unblock"
                },
                {
                    id:2,
                    grouphead: "Raghav",
                    grouptext:"Dinner?",
                    Btn:"unblock"
                },
                {
                    id:3,
                    grouphead: "Raghav",
                    grouptext:"Dinner?",
                    Btn:"unblock"
                },
                {
                    id:4,
                    grouphead: "Raghav",
                    grouptext:"Dinner?",
                    Btn:"unblock"
                },
                ]