import express from "express";
import cors from "cors";

import { bigData } from "./data.js";

const app = express();
const port = 5500;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/accident-list", (req, res) => {
  const { inquiryCategory, inquiryContent, accidentStartDateTime, accidentendDateTime } = req.query;
  let result = [];
  switch (inquiryCategory) {
    case "공제차량":
      result = bigData.filter(el => el.insuredPersonVehicleNum === inquiryContent);
    case "사고일자":
      result = bigData.filter(el => el.accidentDateTime === inquiryContent);
    case "사고번호":
      result = bigData.filter(el => el.accidentNum === inquiryContent);
    case "피공제자코드":
      result = bigData.filter(el => el.contractNum === inquiryContent);
    case "피공제자명":
      result = bigData.filter(el => el.insuredPerson === inquiryContent);
    case "피해자명":
      result = bigData.filter(el => el.insuredPerson === inquiryContent);
    case "피해차량":
      result = bigData.filter(el => el.insuredPersonVehicleNum === inquiryContent);
    case "운전자명":
      result = bigData.filter(el => el.driver === inquiryContent);
    default:
      result = bigData;
  }
  result = result.map(el => {
    return {
      accidentNum: el.accidentNum,
      order: el.order,
      contractNum: el.contractNum,
      accidentDateTime: el.accidentDateTime,
      insuredPerson: el.insuredPerson,
      accidentLocation: el.accidentLocation,
      driver: el.driver,
      notifier: el.notifier
    }
  });
  return res.json(result);
});

app.get("/detail", (req, res) => {
  const accidentNum = req.query.accidentNum;
  const result = accidentNum ? bigData.filter(el => el.accidentNum === accidentNum) : bigData;
  const accidentCurrentStatusList = result.map(el => {
    return {
      order: el.order,
      accidentNum: el.accidentNum,
      insuredPersonVehicleNum: el.insuredPersonVehicleNumel,
      accidentLocation: el.accidentLocation ,
      personSurveyorName: el.personSurveyorName ,
      personSurveyorCenterName: el.personSurveyorCenterName ,
      propertySurveyorName: el.propertySurveyorName ,
      propertySurveyorCenterName: el.propertySurveyorCenterName ,
      coverage: el.coverage
    }
  });
  const lossMoneyCurrentStatus = result.map(el => {
    return {
      responsibilityDecisionMoney: el.responsibilityDecisionMoney,
      arbitraryDecisionMoney: el.arbitraryDecisionMoney,
      responsibilityAssessBalance: el.responsibilityAssessBalance,
      arbitraryAssessBalance: el.arbitraryAssessBalance,
      totalLossMoney: el.totalLossMoney,
    }
  })[0];
  const victimPropertyCurrentStatusList = result.map(el => {
    return {
      order: el.order,
      accidentNum: el.accidentNum,
      coverage: el.coverage,
      damageOrder: el.damageOrder,
      victimPropertyName: el.victimPropertyName,
      managerName: el.managerName,
      managerCenterName: el.managerCenterName,
      progressStatus: el.progressStatus,
      medicalStatus: el.medicalStatus,
      inpatientDays: el.inpatientDays,
      outpatientDays: el.outpatientDays,
      responsibilityDecisionMoney: el.responsibilityDecisionMoney,
      arbitraryDecisionMoney: el.arbitraryDecisionMoney,
      responsibilityAssessMoney: el.responsibilityAssessMoney,
      arbitraryAssessMoney: el.arbitraryAssessMoney,
    }
  });
  const damageLossMoneyCurrentStatus = result.map(el => {
    return {
      responsibilityDecisionMoney: el.responsibilityDecisionMoney,
      arbitraryDecisionMoney: el.arbitraryDecisionMoney,
      responsibilityAssessBalance: el.responsibilityAssessBalance,
      arbitraryAssessBalance: el.arbitraryAssessBalance,
      totalLossMoney: el.totalLossMoney,
    }
  })[0];
  const damageLossChangeList = result.map(el => {
    return {
      order: el.order,
      accidentNum: el.accidentNum,
      coverage: el.coverage,
      damageOrder: el.damageOrder,
      victimPropertyName: el.victimPropertyName,
      dateTime: el.dateTime,
      task: el.task,
      decisionCategory: el.decisionCategory,
      taskNum: el.taskNum,
      injuryGrade: el.injuryGrade,
      inpatientDays: el.inpatientDays,
      outpatientDays: el.outpatientDays,
      medicalStatus: el.medicalStatus,
      responsibilityTotalAssessMoney: el.responsibilityTotalAssessMoney,
      arbitraryTotalAssessMoney: el.arbitraryTotalAssessMoney,
      responsibilityDecisionMoney: el.responsibilityDecisionMoney,
      arbitraryDecisionMoney: el.arbitraryDecisionMoney,
      responsibilityBalance: el.responsibilityBalance,
      arbitraryBalance: el.arbitraryBalance,
      payee: el.payee,
    }
  });


  const data = {
    accidentCurrentStatusList,
    lossMoneyCurrentStatus,
    victimPropertyCurrentStatusList,
    damageLossMoneyCurrentStatus,
    damageLossChangeList,
  };
  res.json({ ...data })
});

app.get("/detailTwo", (req, res) => {
  const { accidentNum, insuredPersonVehicleNum, startDateTime, endDateTime, driver } = req.query;
  let result = bigData;
  
  if ( accidentNum!=='undefined' && driver === 'undefined' ){ result = result.filter(el => el.accidentNum.includes(accidentNum.replace(/"/g,'')));
  }
  if (insuredPersonVehicleNum!=='undefined') {
    result = result.filter(el => el.insuredPersonVehicleNum.includes(insuredPersonVehicleNum.replace(/"/g,'')));
  }
  if (driver!=='undefined') {
    result = result.filter(el => el.driver.includes(driver.replace(/"/g,'')));
  }
  if (startDateTime!=='undefined') {
    result = result.filter(el => new Date(el.accidentDateTime) >= new Date(startDateTime));
  }
  if (endDateTime!=='undefined') {
    result = result.filter(el => new Date(el.accidentDateTime) <= new Date(endDateTime));
  }
  
    const accidentCurrentStatusList = result.map(el => {
    return {
      order: el.order,
      accidentNum: el.accidentNum,
      insuredPersonVehicleNum: el.insuredPersonVehicleNumel,
      accidentLocation: el.accidentLocation ,
      personSurveyorName: el.personSurveyorName ,
      personSurveyorCenterName: el.personSurveyorCenterName ,
      propertySurveyorName: el.propertySurveyorName ,
      propertySurveyorCenterName: el.propertySurveyorCenterName ,
      coverage: el.coverage
    }
  });
  const responsibilityDecisionMoney = String(result.reduce((sum, el) => {
    return sum + Number(el.responsibilityDecisionMoney.replace(/,/g,''));
  },0)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const arbitraryDecisionMoney = String(result.reduce((sum, el) => {
    return sum + Number(el.arbitraryDecisionMoney.replace(/,/g,''));
  },0)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const responsibilityAssessBalance = String(result.reduce((sum, el) => {
    return sum + Number(el.responsibilityAssessBalance.replace(/,/g,''));
  },0)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const arbitraryAssessBalance = String(result.reduce((sum, el) => {
    return sum + Number(el.arbitraryAssessBalance.replace(/,/g,''));
  },0)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const totalLossMoney = String(result.reduce((sum, el) => {
    return sum + Number(el.totalLossMoney.replace(/,/g,''));
  },0)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const lossMoneyCurrentStatus = {
    responsibilityDecisionMoney: responsibilityDecisionMoney,
    arbitraryDecisionMoney: arbitraryDecisionMoney,
    responsibilityAssessBalance: responsibilityAssessBalance,
    arbitraryAssessBalance: arbitraryAssessBalance,
    totalLossMoney: totalLossMoney,
  };
  const victimPropertyCurrentStatusList = result.map(el => {
    return {
      order: el.order,
      accidentNum: el.accidentNum,
      coverage: el.coverage,
      damageOrder: el.damageOrder,
      victimPropertyName: el.victimPropertyName,
      managerName: el.managerName,
      managerCenterName: el.managerCenterName,
      progressStatus: el.progressStatus,
      medicalStatus: el.medicalStatus,
      inpatientDays: el.inpatientDays,
      outpatientDays: el.outpatientDays,
      responsibilityDecisionMoney: el.responsibilityDecisionMoney,
      arbitraryDecisionMoney: el.arbitraryDecisionMoney,
      responsibilityAssessMoney: el.responsibilityAssessMoney,
      arbitraryAssessMoney: el.arbitraryAssessMoney,
    }
  });

  const damageLossMoneyCurrentStatus = {
    responsibilityDecisionMoney: responsibilityDecisionMoney,
    arbitraryDecisionMoney: arbitraryDecisionMoney,
    responsibilityAssessBalance: responsibilityAssessBalance,
    arbitraryAssessBalance: arbitraryAssessBalance,
    totalLossMoney: totalLossMoney,
  };

  const damageLossChangeList = result.map(el => {
    return {
      order: el.order,
      accidentNum: el.accidentNum,
      coverage: el.coverage,
      damageOrder: el.damageOrder,
      victimPropertyName: el.victimPropertyName,
      dateTime: el.dateTime,
      task: el.task,
      decisionCategory: el.decisionCategory,
      taskNum: el.taskNum,
      injuryGrade: el.injuryGrade,
      inpatientDays: el.inpatientDays,
      outpatientDays: el.outpatientDays,
      medicalStatus: el.medicalStatus,
      responsibilityTotalAssessMoney: el.responsibilityTotalAssessMoney,
      arbitraryTotalAssessMoney: el.arbitraryTotalAssessMoney,
      responsibilityDecisionMoney: el.responsibilityDecisionMoney,
      arbitraryDecisionMoney: el.arbitraryDecisionMoney,
      responsibilityBalance: el.responsibilityBalance,
      arbitraryBalance: el.arbitraryBalance,
      payee: el.payee,
    }
  });


  const data = {
    accidentCurrentStatusList,
    lossMoneyCurrentStatus,
    victimPropertyCurrentStatusList,
    damageLossMoneyCurrentStatus,
    damageLossChangeList,
  };
  res.json({ ...data });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));