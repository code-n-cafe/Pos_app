import { getImgURLGiftCards } from "../../util";

export default function Giftcard(){
    return(
    <>
     <h2 >Surprise your friends with giftcards and make their day</h2>
       <div className="Allgiftcards">
        <div className="AllgiftcardsA">
            <h4  >HAPPY BIRTHDAY</h4>
            <div className="Birthday">
                <img className="HB" src={getImgURLGiftCards("giftcardG.jpg")} alt="" height={200} width={320} />  
                <img  className="HB" src={getImgURLGiftCards("giftcardH.jpg")} alt="" height={200} width={320} />
                <img className="HB" src={getImgURLGiftCards("giftcardj.jpg")} alt="" height={200} width={320} />
            </div><br />
            <h4>GOOD JOB TEAM</h4>
            <div className="goodjob">
            <img className="HB" src={getImgURLGiftCards("giftcardA.jpg")} alt="" height={200} width={320} />  
                <img  className="HB" src={getImgURLGiftCards("giftcardD.jpg")} alt="" height={200} width={320} />
                <img className="HB" src={getImgURLGiftCards("giftcardB.jpg")} alt="" height={200} width={320} />
            </div>
            <h4>THANK YOU</h4>
            <div className="goodjob">
            <img className="HB" src={getImgURLGiftCards("giftcardF.jpg")} alt="" height={200} width={320} />  
                <img  className="HB" src={getImgURLGiftCards("giftcardB.jpg")} alt="" height={200} width={320} />
                <img className="HB" src={getImgURLGiftCards("giftcardE.jpg")} alt="" height={200} width={320} />
            </div>
        </div>
       </div>
    
    </>
    );
}
