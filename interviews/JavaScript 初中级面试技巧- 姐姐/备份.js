function shallowCopy(obj){
 if(typeof obj==='function'&& obj!==null){
  let cloneObj=Array.isArray(obj)?[]:{}
  for(let prop in obj){
   if(obj.hasOwnProperty(prop)){
    cloneObj[prop]=obj[prop]
   }
  }
  return cloneObj
 }
 else{
  return obj
 }
}


function shallowCopy() {
	if (typeof obj !=='function'&& obj!==null) {
		let cloneObj = Array.isArray(obj) ? [] : {}
		for (let prop in obj) {
			cloneObj[key] = obj[prop]
		}
		return cloneObj
	} else {
		return obj
	}
}


function filterArr() {
	return new Set(arr)
}

function filterArr2(arr) {
	let newArr = arr.filter((item, index)=>{
		return arr.indexOf(item)===index
	})
	console.log(newArr)
}

function filterArr3(arr) {
	let isRepeat, newArr=[];
	for(let i = 0; i < arr.length; i++) {
		isRepeat = false
		for (let j = 0; j < arr.length; j++) {
			if (arr[i] === arr[j]) {
				isRepeat = true
			}
		}
		if (!isRepeat) {
			newArr.push(arr[i])
		}
	}
	return newArr
}


function filterArr4(arr) {
	let seen = {}
	return arr.filter((item)=>{
		return seen.hasOwnProperty(item) ? false : (seen[item]=true)
	})
}

function filterArr5(arr) {
	let lastArr = []
	const newArr = arr.sort((a,b)=>{
		return a-b
	})

	for(let i = 0; i < newArr.length; i++) {
		if (newArr[i] !=== newArr[i+1) {
			lastArr.push(newArr[i])
		}
	}
	return lastArr
}


import SmsCodeLink from '@/components/SmsCodeLink'
import { getConsentStatus } from '@/services'
import { getContacts, getNationalId, getOccupation, getPersonal } from '@/services/credit'
import { formatWithPos } from '@/utils/form'
import formatMoney from '@/utils/formatMoney'
import { normalToDateTH } from '@/utils/time'
import { number, required } from '@/utils/validate'
import { createFormActions, IFieldState, IFormEffect, ISchema, LifeCycleTypes } from '@formily/react-schema-renderer'
import React from 'react'
import { getLocale, formatMessage } from 'umi-plugin-locale'
import { versionCompare } from '@/utils/versionCompare'

const actions = createFormActions()
const changeVersion = '2.0.0' // >=
const version = localStorage.version
const isVersionToLow = versionCompare(version || '', changeVersion) === -1

const showConsent = (consentStatus: any[], targetType: string) => {
  const targetObj = consentStatus.find(item => item.consentType === targetType) || {}
  return consentStatus.length && targetObj.consentStatus !== '2'
}

const getSchema = (
  showAgreement: (type: string) => void,
  ifShowAuthorized: number,
  isProductLoc: boolean,
  locConsentStatus: any[],
): ISchema => {
  const locConsentObj: any = {}
  if (showConsent(locConsentStatus, '11')) {
    locConsentObj.crossSell = {
      type: 'checkboxGroup',
      title: formatMessage({ id: 'loanApplication.crossSell' }),
      description: (
        <div>
          {formatMessage({ id: 'loanApplication.crossSellDesc' })}
          <span className="consent-click-entry" onClick={() => showAgreement('11')}>
            {formatMessage({ id: 'loanApplication.crossSellLink' })}
          </span>
        </div>
      ),
      enum: [
        { label: formatMessage({ id: 'global.accept' }), value: '2' },
        { label: formatMessage({ id: 'global.decline' }), value: '1' },
      ],
      'x-props': {
        layout: 'row',
      },
      'x-rules': [required()],
    }
  }
  // if (showConsent(locConsentStatus, '10')) {
  //   locConsentObj.modelConsent = {
  //     type: 'checkboxGroup',
  //     title: formatMessage({ id: 'title.modelConsent' }),
  //     description: (
  //       <div>
  //         {formatMessage({ id: 'description.modelConsent' })}
  //         <span className="consent-click-entry" onClick={() => showAgreement('10')}>
  //           {formatMessage({ id: 'title.modelConsent' })}
  //         </span>
  //       </div>
  //     ),
  //     enum: [
  //       { label: formatMessage({ id: 'global.accept' }), value: '2' },
  //       { label: formatMessage({ id: 'global.decline' }), value: '1' },
  //     ],
  //     'x-props': {
  //       layout: 'row',
  //     },
  //     'x-rules': [required()],
  //   }
  // }
  if (showConsent(locConsentStatus, 'LOC012')) {
    locConsentObj.marketingConsent = {
      type: 'checkboxGroup',
      title: formatMessage({ id: 'title.marketingConsent' }),
      description: (
        <div>
          {formatMessage({ id: 'description.marketingConsent' })}
          <span className="consent-click-entry" onClick={() => showAgreement('LOC012')}>
            {formatMessage({ id: 'title.marketingConsent' })}
          </span>
        </div>
      ),
      enum: [
        { label: formatMessage({ id: 'global.accept' }), value: '2' },
        { label: formatMessage({ id: 'global.decline' }), value: '1' },
      ],
      'x-props': {
        layout: 'row',
      },
      'x-rules': [required()],
    }
  }

  return {
    type: 'object',
    properties: {
      nationalId: {
        type: 'object',
        title: formatMessage({ id: 'credit.confirm.personalInformation' }),
        'x-component': 'block',
        properties: {
          personalInformation: {
            type: 'obejct',
            'x-component': 'block',
            'x-props': {
              childrenTitle: (
                <div className="luv-form-block-content-title">
                  {formatMessage({ id: 'credit.confirm.personalInformation' })}
                </div>
              ),
            },
            properties: {
              titleName: {
                type: 'input',
                title: formatMessage({ id: 'form.title' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              name: {
                type: 'input',
                title: formatMessage({ id: 'form.name' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              surname: {
                type: 'input',
                title: formatMessage({ id: 'form.surname' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              dob: {
                type: 'input',
                title: formatMessage({ id: 'form.dob' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              idCardNo: {
                type: 'input',
                title: formatMessage({ id: 'form.idCardNo' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              email: {
                type: 'inputAddr',
                title: formatMessage({ id: 'form.email' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              educationName: {
                type: 'inputAddr',
                title: formatMessage({ id: 'form.education' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              maritalName: {
                type: 'inputAddr',
                title: formatMessage({ id: 'form.marital' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              treatCount: {
                type: 'input',
                title: formatMessage({ id: 'form.dependencies' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
            },
          },
          currentAddress: {
            type: 'object',
            'x-component': 'block',
            'x-props': {
              childrenTitle: (
                <div className="luv-form-block-content-title">
                  {formatMessage({ id: 'credit.confirm.currentAddress' })}
                </div>
              ),
            },
            properties: {
              currentAddress: {
                type: 'address',
                'x-props': {
                  formItemStyle: {
                    // border: 'none',
                    // padding: 0,
                  },
                },
                'x-component-props': {
                  required: true,
                },
              },
            },
          },
          registrationAddress: {
            type: 'obejct',
            'x-component': 'block',
            'x-props': {
              childrenTitle: (
                <div className="luv-form-block-content-title">
                  {formatMessage({ id: 'credit.confirm.registrationAddress' })}
                </div>
              ),
            },
            properties: {
              currentAddress: {
                type: 'inputAddr',
                title: formatMessage({ id: 'personal.curAddr' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              registerAddress: {
                type: 'inputAddr',
                title: formatMessage({ id: 'personal.regAddr' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
            },
          },
          occupational: {
            type: 'object',
            'x-component': 'block',
            'x-props': {
              childrenTitle: (
                <div className="luv-form-block-content-title">
                  {formatMessage({ id: 'credit.confirm.currentAddress' })}
                </div>
              ),
            },
            properties: {
              occupationGroupName: {
                type: 'input',
                title: formatMessage({ id: 'credit.confirm.occupational' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              industryName: {
                type: 'inputAddr',
                title: formatMessage({ id: 'form.industry' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              companyName: {
                type: 'inputAddr',
                title: formatMessage({ id: 'form.companyName' }),
                editable: false,
                'x-props': {
                  forbidDuplicationAndCopy: true,
                },
              },
              officeNumber: {
                type: 'input',
                visible: true,
                title: formatMessage({ id: 'form.officeNumber' }),
                'x-props': {
                  placeholder: formatMessage({ id: 'form.p.officeNumber' }),
                  maxlength: 100,
                  forbidDuplicationAndCopy: true,
                },
                'x-rules': [required()],
              },
              Payday: {
                type: 'chooseDays',
                title: formatMessage({ id: 'form.Payday' }),
                'x-props': {
                  placeholder: formatMessage({ id: 'form.p.Payday' }),
                  forbidDuplicationAndCopy: true,
                },
                'x-rules': [required()],
              },
              companyAddress: {
                type: 'object',
                'x-component': 'block',
                'x-props': {
                  childrenTitle: (
                    <div className="luv-form-block-content-title">
                      {formatMessage({ id: 'credit.confirm.companyAddr' })}
                    </div>
                  ),
                },
                properties: {
                  companyAddress: {
                    type: 'address',
                    'x-props': {
                      formItemStyle: {
                        border: 'none',
                        padding: 0,
                      },
                    },
                    'x-component-props': {
                      prefix: [
                        {
                          type: 'checkboxGroup',
                          name: 'sameAs',
                          visible: false,
                          default: [2],
                          enum: [
                            { label: formatMessage({ id: 'form.sameAsReg' }), value: 0 },
                            { label: formatMessage({ id: 'form.sameAsCurr' }), value: 1 },
                            { label: formatMessage({ id: 'form.otherAddr' }), value: 2 },
                          ],
                          'x-props': {
                            min: 1,
                            formItemStyle: {
                              border: 'none',
                              padding: 0,
                            },
                          },
                        },
                      ],
                      required: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      // personal: {
      //   type: 'object',
      //   title: formatMessage({ id: 'personal.title' }),
      //   'x-component': 'block',
      //   properties: {
      //     mobileNo: {
      //       type: 'input',
      //       title: formatMessage({ id: 'loanApplication.mobileNo' }),
      //       editable: false,
      //       'x-props': {
      //         forbidDuplicationAndCopy: true,
      //       },
      //     },
      //     // homePhoneNo: {
      //     //   type: 'input',
      //     //   title: formatMessage({ id: 'loanApplication.homeNo' }),
      //     //   editable: false,
      //     //   'x-props': {
      //     //     forbidDuplicationAndCopy: true,
      //     //   },
      //     // },
      //   },
      // },
      // emergency: {
      //   type: 'object',
      //   title: formatMessage({ id: 'emergency.title' }),
      //   'x-component': 'block',
      //   properties: {
      //     contactA: {
      //       type: 'object',
      //       'x-props': {
      //         formItemStyle: {
      //           border: 'none',
      //           padding: 0,
      //         },
      //       },
      //       properties: {
      //         tipA: {
      //           type: 'element',
      //           'x-props': {
      //             children: `${formatMessage({ id: 'loanApplication.emergencyTip' })} 1`,
      //           },
      //         },
      //         contactNameA: {
      //           type: 'input',
      //           title: formatMessage({ id: 'form.contactName' }),
      //           editable: false,
      //           'x-props': {
      //             forbidDuplicationAndCopy: true,
      //           },
      //         },
      //         surnameA: {
      //           type: 'input',
      //           title: formatMessage({ id: 'form.surname' }),
      //           editable: false,
      //           'x-props': {
      //             forbidDuplicationAndCopy: true,
      //           },
      //         },
      //         relationshipNameA: {
      //           type: 'input',
      //           title: formatMessage({ id: 'form.relationship' }),
      //           editable: false,
      //           'x-props': {
      //             forbidDuplicationAndCopy: true,
      //           },
      //         },
      //         mobileNoA: {
      //           type: 'input',
      //           title: formatMessage({ id: 'form.mobileNo' }),
      //           editable: false,
      //           'x-props': {
      //             forbidDuplicationAndCopy: true,
      //           },
      //         },
      //         // emailA: {
      //         //   type: 'inputAddr',
      //         //   title: formatMessage({ id: 'form.emailOpt' }),
      //         //   editable: false,
      //         //   'x-props': {
      //         //     forbidDuplicationAndCopy: true,
      //         //   },
      //         // },
      //         // currentAddressA: {
      //         //   type: 'inputAddr',
      //         //   title: formatMessage({ id: 'form.addressOpt' }),
      //         //   editable: false,
      //         //   'x-props': {
      //         //     forbidDuplicationAndCopy: true,
      //         //   },
      //         // },
      //       },
      //     },
      //     contactB: {
      //       type: 'object',
      //       'x-props': {
      //         formItemStyle: {
      //           border: 'none',
      //           padding: 0,
      //         },
      //       },
      //       properties: {
      //         tipB: {
      //           type: 'element',
      //           'x-props': {
      //             children: `${formatMessage({ id: 'loanApplication.emergencyTip' })} 2`,
      //           },
      //         },
      //         contactNameB: {
      //           type: 'input',
      //           title: formatMessage({ id: 'form.contactName' }),
      //           editable: false,
      //           'x-props': {
      //             forbidDuplicationAndCopy: true,
      //           },
      //         },
      //         surnameB: {
      //           type: 'input',
      //           title: formatMessage({ id: 'form.surname' }),
      //           editable: false,
      //           'x-props': {
      //             forbidDuplicationAndCopy: true,
      //           },
      //         },
      //         relationshipNameB: {
      //           type: 'input',
      //           title: formatMessage({ id: 'form.relationship' }),
      //           editable: false,
      //           'x-props': {
      //             forbidDuplicationAndCopy: true,
      //           },
      //         },
      //         mobileNoB: {
      //           type: 'input',
      //           title: formatMessage({ id: 'form.mobileNo' }),
      //           editable: false,
      //           'x-props': {
      //             forbidDuplicationAndCopy: true,
      //           },
      //         },
      //         // emailB: {
      //         //   type: 'inputAddr',
      //         //   title: formatMessage({ id: 'form.emailOpt' }),
      //         //   editable: false,
      //         //   'x-props': {
      //         //     forbidDuplicationAndCopy: true,
      //         //   },
      //         // },
      //         // currentAddressB: {
      //         //   type: 'inputAddr',
      //         //   title: formatMessage({ id: 'form.addressOpt' }),
      //         //   editable: false,
      //         //   'x-props': {
      //         //     forbidDuplicationAndCopy: true,
      //         //   },
      //         // },
      //       },
      //     },
      //   },
      // },
      // dataSourceLinkT: {
      //   type: 'block',
      //   visible: Boolean(ifShowAuthorized) || localStorage.getItem('boontermVisible') === '2',
      //   title: formatMessage({ id: 'loanApplication.dataSource' }),
      //   'x-component': 'block',
      //   'x-props': {
      //     expandChildren: <div className={'expandChildren'} />,
      //     contentClassName: 'authorized',
      //   },
      //   properties: {
      //     authorized: {
      //       type: 'element',
      //       visible: Boolean(ifShowAuthorized),
      //       'x-props': {
      //         children: (
      //           <>
      //             <img src={require('@/assets/images/SCB@2x.png')} className={'SCBImg'} />
      //             <span className={'SCBTitle'}>{formatMessage({ id: 'loanApplication.SCBSource' })}</span>
      //             <span className={'SCBau'}>{formatMessage({ id: 'global.authorized' })}</span>
      //           </>
      //         ),
      //       },
      //     },
      //     boonterm: {
      //       type: 'element',
      //       visible: localStorage.getItem('boontermVisible') === '2',
      //       'x-props': {
      //         children: (
      //           <>
      //             <img src={require('@/assets/images/boonterm.png')} className={'SCBImg'} />
      //             <span className={'SCBTitle'}>{formatMessage({ id: 'loanApplication.boontermSource' })}</span>
      //             <span className={'SCBau'}>{formatMessage({ id: 'global.authorized' })}</span>
      //           </>
      //         ),
      //       },
      //     },
      //   },
      // },
      // dataSourceLinkNcb: {
      //   type: 'block',
      //   visible: localStorage.ncbVisible === '1' && localStorage.bizParamValue === '1',
      //   title: formatMessage({ id: 'loanApplication.dataSourceNcb' }),
      //   'x-component': 'block',
      //   'x-props': {
      //     expandChildren: <div className={'expandChildren'} />,
      //     contentClassName: 'authorized',
      //   },
      //   properties: {
      //     authorized: {
      //       type: 'element',
      //       'x-props': {
      //         children: (
      //           <>
      //             <span className={'ncbTitle'}>{formatMessage({ id: 'loanApplication.NcbSource' })}</span>
      //             <span className={'ncbau'}>{formatMessage({ id: 'global.agree' })}</span>
      //           </>
      //         ),
      //       },
      //     },
      //   },
      // },
      // dataSourceLink: {
      //   type: 'object',
      //   title: '',
      //   'x-component': 'block',
      //   'x-props': {
      //     blockClassName: 'confirm-consents',
      //   },
      //   properties: {
      //     tc: {
      //       type: 'checkbox',
      //       title: formatMessage({ id: 'loanApplication.tc' }),
      //       'x-props': {
      //         label: (
      //           <span>
      //             {formatMessage({ id: 'loanApplication.tcDesc' })}
      //             <span
      //               className="consent-click-entry tc-consent"
      //               onClick={e => {
      //                 e.preventDefault()
      //                 showAgreement('12')
      //               }}>
      //               {formatMessage({ id: 'loanApplication.tcLink' })}
      //             </span>
      //           </span>
      //         ),
      //       },
      //       'x-rules': [
      //         {
      //           validator(value: any) {
      //             if (!value) return { type: 'error', message: formatMessage({ id: 'form.e.required' }) }
      //             return
      //           },
      //         },
      //       ],
      //     },
      //     ...(isVersionToLow
      //       ? {
      //           crossSell: {
      //             type: 'checkboxGroup',
      //             title: formatMessage({ id: 'loanApplication.crossSell' }),
      //             description: (
      //               <div>
      //                 {formatMessage({ id: 'loanApplication.crossSellDesc' })}
      //                 <span className="consent-click-entry" onClick={() => showAgreement('11')}>
      //                   {formatMessage({ id: 'loanApplication.crossSellLink' })}
      //                 </span>
      //               </div>
      //             ),
      //             enum: [
      //               { label: formatMessage({ id: 'global.accept' }), value: '2' },
      //               { label: formatMessage({ id: 'global.decline' }), value: '1' },
      //             ],
      //             'x-props': {
      //               layout: 'row',
      //             },
      //             'x-rules': [required()],
      //           },
      //         }
      //       : {}),
      //     ...(isProductLoc && !isVersionToLow ? locConsentObj : {}),
      //   },
      // },
    },
  }
}

const getAddress = (obj: any) => {
  const locale = getLocale()
  const villageName = obj.villageName || ''
  const floorNo = obj.floorNo ? ` ${formatMessage({ id: 'loanApplication.prefix.floorNo' })} ${obj.floorNo}` : ''
  const roomNo = obj.roomNo ? ` ${formatMessage({ id: 'loanApplication.prefix.roomNo' })} ${obj.roomNo}` : ''
  const houseNoTh = obj.houseNo ? ` ${formatMessage({ id: 'loanApplication.prefix.houseNo' })} ${obj.houseNo}` : ''
  const houseNo = obj.houseNo ? ' ' + obj.houseNo : ''
  const villageNo = obj.villageNo
    ? ` ${formatMessage({ id: 'loanApplication.prefix.villageNo' })} ${obj.villageNo}`
    : ''
  const alley = obj.alley ? ` ${formatMessage({ id: 'loanApplication.prefix.alley' })} ${obj.alley}` : ''
  const roadTh = obj.road ? ` ${formatMessage({ id: 'loanApplication.prefix.road' })} ${obj.road}` : ''
  const road = obj.road ? ` ${obj.road} ${formatMessage({ id: 'loanApplication.prefix.road' })}` : ''
  const subDistrictNameTh = obj.subDistrictName
    ? ` ${formatMessage({ id: 'loanApplication.prefix.subDistrictName' })} ${obj.subDistrictName}`
    : ''
  const subDistrictName = obj.subDistrictName || ''
  const districtNameTh = obj.districtName
    ? ` ${formatMessage({ id: 'loanApplication.prefix.districtName' })} ${obj.districtName}`
    : ''
  const districtName = obj.districtName || ''
  const provinceNameTh = obj.provinceName
    ? ` ${formatMessage({ id: 'loanApplication.prefix.provinceName' })} ${obj.provinceName}`
    : ''
  const provinceName = obj.provinceName || ''
  const postalCode = obj.postalCode ? ' ' + obj.postalCode : ''
  if (locale.includes('TH')) {
    return `${villageName}${floorNo}${roomNo}${houseNoTh}${villageNo}${alley}${roadTh}${subDistrictNameTh}${districtNameTh}${provinceNameTh}${postalCode}`.trim()
  } else {
    return `${villageName}${floorNo}${roomNo}${houseNo}${villageNo}${alley}${road}${subDistrictName}${districtName}${provinceName}${postalCode}`.trim()
  }
}

const effects: IFormEffect = ($, s) => {
  $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
    if (isVersionToLow) {
      getConsentStatus({
        consents: [{ consentType: '11' }],
      })
        .then(({ consents = [] }) => {
          const consent = consents[0]
          if (consent) {
            if (consent.newest === '1' && consent.consentStatus === '2') {
              // 如果是最新的且之前签署过了，就隐藏此项
              s.setFieldState('dataSourceLink.crossSell', (e: IFieldState) => {
                e.display = false
                e.value = '2'
              })
            }
          }
        })
        .catch((e: any) => {
          console.log(e)
        })
    }
    getNationalId()
      .then(res => {
        s.setFieldValue('titleName', res.titleName)
        s.setFieldValue('name', res.name)
        s.setFieldValue('surname', res.surname)
        s.setFieldValue('dob', res.dob ? normalToDateTH(res.dob) : '')
        s.setFieldValue('idCardNo', res.idCardNo)
        s.setFieldValue('idCardExpiry', res.idCardExpiry ? normalToDateTH(res.idCardExpiry) : '')
      })
      .catch((e: any) => {
        console.log(e)
      })
    getPersonal()
      .then(res => {
        s.setFieldValue('email', res.contact.email)
        s.setFieldValue('mobileNo', res.contact.mobileNo)
        // s.setFieldValue('homePhoneNo', formatWithPos(res.contact.homePhoneNo, [1, 4]))
        s.setFieldValue('currentAddress', getAddress(res.currentAddress))
        s.setFieldValue('registerAddress', getAddress(res.registerAddress))
        s.setFieldValue('maritalName', res.basicInfo.maritalName)
        s.setFieldValue('treatCount', res.basicInfo.treatCount)
        s.setFieldValue('educationName', res.basicInfo.educationName)
      })
      .catch((e: any) => {
        console.log(e)
      })
    getOccupation()
      .then(res => {
        if (res.occupationGroupCode === '3') {
          s.setFieldState('companyName', (e: IFieldState) => {
            e.display = false
          })
        }
        s.setFieldValue('occupationGroupName', res.occupationGroupName)
        s.setFieldValue('industryName', res.industryName)
        s.setFieldValue('companyName', res.companyName)
        s.setFieldValue('netMonthlyIncome', formatMoney(res.netMonthlyIncome, true))
        s.setFieldValue('companyAddress', getAddress(res.companyAddress))
      })
      .catch((e: any) => {
        console.log(e)
      })
    getContacts()
      .then(res => {
        if (res) {
          // const { currentAddressA = {}, currentAddressB = {} } = res
          const baseKeys = ['contactName', 'surname', 'relationshipName', 'mobileNo', 'email']
          baseKeys.forEach(item => {
            if (item === 'mobileNo') {
              s.setFieldValue(`contactA.${item}A`, formatWithPos(res[`${item}A`], [2, 5]))
              s.setFieldValue(`contactB.${item}B`, formatWithPos(res[`${item}B`], [2, 5]))
            } else {
              s.setFieldValue(`contactA.${item}A`, res[`${item}A`])
              s.setFieldValue(`contactB.${item}B`, res[`${item}B`])
            }
          })
          // s.setFieldValue('contactA.currentAddressA', getAddress(currentAddressA))
          // s.setFieldValue('contactB.currentAddressB', getAddress(currentAddressB))
        }
      })
      .catch((e: any) => {
        console.log(e)
      })
  })
}

const codeActions = createFormActions()

const getCodeSchema = (fn: { (): Promise<void>; (): any }, refCode = ''): ISchema => {
  return {
    type: 'object',
    properties: {
      otp: {
        type: 'inputSmsCode',
        title: refCode ? formatMessage({ id: 'form.new.otp' }, { refCode }) : formatMessage({ id: 'form.no.otp' }),
        'x-props': {
          type: 'number',
          maxlength: 6,
          placeholder: formatMessage({ id: 'form.p.otp' }),
          extra: <SmsCodeLink interval={60000} onSend={() => new Promise(r => r()).then(() => fn())} />,
        },
        'x-rules': [required(), number(6, 6, formatMessage({ id: 'form.e.otp' }))],
      },
    },
  }
}

export { actions, getSchema, effects, codeActions, getCodeSchema }
















