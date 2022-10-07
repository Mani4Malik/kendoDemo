import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, ElementRef, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { nodeIndex } from '@progress/kendo-angular-dropdowns/dropdowntrees/lookup/lookup.service';
import { BehaviorSubject } from 'rxjs';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children!: TodoItemNode[];
  item!: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item!: string;
  level!: number;
  expandable!: boolean;
}

/**
 * The Json object for to-do list data.
 */
 let TREE_DATA = [
        {
            "id": 100547,
            "text": "Activation Delay",
            "parent": "#",
            "state": {
                "opened": true
            },
            "children": [
                {
                    "id": 100548,
                    "text": "Poor identification by EMS",
                    "parent": "100547",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100550,
                            "text": "Alternating symptoms presentation for basilar thrombosis missed",
                            "parent": "100548",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100551,
                            "text": "Poor design or training of questions that would trigger tool usage (Defect)",
                            "parent": "100548",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100552,
                            "text": "Posterior Circulation symptoms (dizziness, nausea) missed",
                            "parent": "100548",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100553,
                            "text": " Concurrent presentation / code (chest pain, trauma, sepsis alert)",
                            "parent": "100548",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100554,
                            "text": " Resolving or \"improving\" symptoms",
                            "parent": "100548",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100555,
                    "text": " Identification occurred by EMS but otherwise delayed",
                    "parent": "100547",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100557,
                            "text": "  Pre-arrival activation by EMS took place, ED staff did not activate Stroke Alert",
                            "parent": "100555",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100558,
                            "text": " Pre-arrival activation by EMS took place, TS was not notified with ETA",
                            "parent": "100555",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100559,
                            "text": " ETA protocol was not carried out by TeleSpecialists RRC",
                            "parent": "100555",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100560,
                            "text": " No activation of stroke team",
                            "parent": "100555",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100561,
                            "text": " Activation of hospital stroke team took place, but poor preparedness of the team",
                            "parent": "100555",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100562,
                    "text": " Delays on recognition by nursing upon arrival ",
                    "parent": "100547",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100563,
                            "text": "Nursing did not identify stroke symptoms",
                            "parent": "100562",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100564,
                            "text": " Pt ID defects- tool usage (Defect)",
                            "parent": "100562",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100565,
                            "text": "  Poor design or training of questions that would trigger tool usage (Defect)",
                            "parent": "100562",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100566,
                            "text": " Inadequate skill set of the nursing staff",
                            "parent": "100562",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100567,
                            "text": " Posterior Circulation symptoms (dizziness, nausea) missed",
                            "parent": "100562",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100568,
                            "text": " Missed identification due to concurrent symptoms presentation",
                            "parent": "100562",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100569,
                            "text": "Resolving or \"improving\" symptoms",
                            "parent": "100562",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100570,
                    "text": "Delayed Stroke Alert Trigger",
                    "parent": "100547",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100571,
                            "text": "Call center delay in activating stroke alert ",
                            "parent": "100570",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100572,
                            "text": " RN did not trigger stroke alert timely (Unnecessary wait)",
                            "parent": "100570",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100573,
                            "text": "Stroke alert not triggered because of resolving or improving symptoms ",
                            "parent": "100570",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100574,
                            "text": " ED Physician needs to be notified before SA is triggered (Extra processing)",
                            "parent": "100570",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100575,
                            "text": " Absence of clear process for notification of TS when SA is triggered",
                            "parent": "100570",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 101288,
                    "text": "Not Applicable (see comments)",
                    "parent": "100547",
                    "state": {
                        "opened": true
                    },
                    "children": [],
                    "workflowid": null
                }
            ],
            "workflowid": null
        },
        {
            "id": 100576,
            "text": "Delayed Assessment\t",
            "parent": "#",
            "state": {
                "opened": true
            },
            "children": [
                {
                    "id": 100577,
                    "text": "Delays in assessment related to Cart position, Transport, Rooming",
                    "parent": "100576",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100578,
                            "text": "Position of the cart lost",
                            "parent": "100577",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100579,
                            "text": "Cart transported to Room while the patient is at CT (Transportation)",
                            "parent": "100577",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100580,
                            "text": "Requires provider to change cart (CT to Room)",
                            "parent": "100577",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100581,
                    "text": "Delays in assessment related to Imaging ",
                    "parent": "100576",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100582,
                            "text": "Patient taken for CT scan before physician could assess",
                            "parent": "100581",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100583,
                            "text": "Patient was in radiology for an excessive period of time before physician assessment ",
                            "parent": "100581",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100584,
                                    "text": "Upfront advanced imaging completed prior to neurological exam (Unnecessary wait)",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100585,
                                    "text": "CT table not ready (Lack of early activation and clearing of the table (Defect)",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100586,
                                    "text": "Long distance to CT (Non-value added but necessary)",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100587,
                                    "text": "Technologist not ready for CT",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100588,
                                    "text": "No order for the CT, delay in early order (Unnecessary wait )",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100589,
                                    "text": "Unavailable slected stretcher to transport the patient to- after the CT (Unnecessary wait)",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100590,
                                    "text": "Delays in obtaining imaging due to patient agitation requirung pharmacological intervention",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100591,
                                    "text": "Unable to take cart to CT due to staffing",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100592,
                                    "text": "Delays in obtaining imaging due to patient vomiting requirung pharmacological intervention",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100593,
                                    "text": "Repeat imaging needed due to patients rapid change in status",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100594,
                                    "text": "Unnecessary testing - Creatinine",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100595,
                                    "text": "Delays related to IV site placement",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100596,
                                    "text": "Thrombolytic  delayed due to staff request until second IV site placed (Unnecessary wait)",
                                    "parent": "100583",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100597,
                            "text": "Teleneurologist exam delayed until after imaging is completed due to staff request (Unnecessary wait)",
                            "parent": "100581",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100598,
                            "text": "Teleneurologist exam delayed until after imaging is completed due hospital policy (Unnecessary wait)",
                            "parent": "100581",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100599,
                            "text": "Teleneurologist exam delayed until after imaging is completed due to neurologist request (Unnecessary wait)",
                            "parent": "100581",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100600,
                            "text": "Cart taken to CT scanner with patient but no assessment at the CT scanner",
                            "parent": "100581",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100601,
                                    "text": "Unable to examine patient on the CT table by telemedicine, due to positioning",
                                    "parent": "100600",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100602,
                                    "text": "Physician not allowed to assess patient at the scanner until all scans completed",
                                    "parent": "100600",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100603,
                    "text": "Delays in assessment related to patient related factors",
                    "parent": "100576",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100604,
                            "text": "Patient agitated and could not be assessed timely",
                            "parent": "100603",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100605,
                            "text": "Difficult examination in CT scanner",
                            "parent": "100603",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100606,
                            "text": "Patient unwilling to be assessed",
                            "parent": "100603",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100607,
                            "text": "Patient needed to be stabilized before assessment",
                            "parent": "100603",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100608,
                    "text": "Delay in assessment related to facility related factors",
                    "parent": "100576",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100609,
                            "text": "NIHSS Booklet not available",
                            "parent": "100608",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100610,
                            "text": "Staff not available to assist with examination",
                            "parent": "100608",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100611,
                    "text": "Delays in assessment related to technology",
                    "parent": "100576",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100612,
                            "text": "Physician unable to log in to cart",
                            "parent": "100611",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100613,
                                    "text": "Cart not on auto-answer",
                                    "parent": "100612",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100614,
                                    "text": "No one responding to the cart calling",
                                    "parent": "100612",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100615,
                                    "text": "Cart in use for another case",
                                    "parent": "100612",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100616,
                                    "text": "Cart hardware malfunction",
                                    "parent": "100612",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100617,
                            "text": "Cart not at bedside for prolonged period of time",
                            "parent": "100611",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100618,
                                    "text": "Wrong cart number given by clerk",
                                    "parent": "100617",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100619,
                                    "text": "Cart cannot be found by on ground staff",
                                    "parent": "100617",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100620,
                                    "text": "Multiple Stroke alerts and facility has one cart",
                                    "parent": "100617",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100621,
                            "text": "Physician station down",
                            "parent": "100611",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100622,
                            "text": "Cart hardware malfunction",
                            "parent": "100611",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100623,
                            "text": "Hospital network issue/ connectivity",
                            "parent": "100611",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100624,
                            "text": "Physician password expired- Passed stroke alert per control",
                            "parent": "100611",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 101285,
                    "text": "Not Applicable (see comments)",
                    "parent": "100576",
                    "state": {
                        "opened": true
                    },
                    "children": [],
                    "workflowid": null
                }
            ],
            "workflowid": null
        },
        {
            "id": 100625,
            "text": "Delayed Thrombolytic Decision\t",
            "parent": "#",
            "state": {
                "opened": true
            },
            "children": [
                {
                    "id": 100626,
                    "text": "Delays related to lack of information for contraindications",
                    "parent": "100625",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100627,
                            "text": "Family not available / patient non-verbal",
                            "parent": "100626",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100628,
                            "text": "Awaiting on history by family on potential contraindications",
                            "parent": "100626",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100629,
                            "text": "Awaiting family arrival before decision as per patient's request",
                            "parent": "100626",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100630,
                            "text": "Additional information became available which did not exist upon initial assessment",
                            "parent": "100626",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100631,
                            "text": "Extensive chart review needed for history on contraindications",
                            "parent": "100626",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100632,
                    "text": "Delays related to patient or family",
                    "parent": "100625",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100633,
                            "text": "Family/patient unsure of decision",
                            "parent": "100632",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100634,
                            "text": "More extensive discussion on the management decision was requested by patient or family",
                            "parent": "100632",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100635,
                    "text": "Laboratory coagulation studies were needed before thrombolytics decision",
                    "parent": "100625",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100636,
                            "text": "Delays in Ordering of Labs",
                            "parent": "100635",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100637,
                                    "text": "ED stroke alert orderset not utilized",
                                    "parent": "100636",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100638,
                            "text": "Delays in lab draw and delivery",
                            "parent": "100635",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100639,
                                    "text": "No phlebotomist availabe at beside",
                                    "parent": "100638",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100640,
                                    "text": "Poor IV access",
                                    "parent": "100638",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100641,
                                    "text": "Knowledge of deficit/Lack of Skill Set",
                                    "parent": "100638",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100642,
                                    "text": "Order not received by laboratory ",
                                    "parent": "100638",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100643,
                                    "text": "Tube system delay ",
                                    "parent": "100638",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100644,
                                    "text": "Poor hand-off / delivery",
                                    "parent": "100638",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100645,
                            "text": "Delays in lab processing ",
                            "parent": "100635",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100646,
                                    "text": "Knowledge of deficit of lab staff of priority ",
                                    "parent": "100645",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100647,
                                    "text": "Labs not identified as STAT",
                                    "parent": "100645",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100648,
                                    "text": "Equipment issue (Defect)",
                                    "parent": "100645",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100649,
                                    "text": "Lack of stroke communication to lab staff",
                                    "parent": "100645",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100650,
                    "text": "Further studies or history needed for decision",
                    "parent": "100625",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100651,
                            "text": "Delays related to repeat imaging ",
                            "parent": "100650",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100652,
                                    "text": "Repeat imaging needed due to patients rapid change in status",
                                    "parent": "100651",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100653,
                                    "text": "Poor quality imaging ",
                                    "parent": "100651",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100654,
                            "text": "Delays related to repeat laboratory ",
                            "parent": "100650",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100655,
                                    "text": "Specimen hemolyzed",
                                    "parent": "100654",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100656,
                                    "text": "Key laboratory test not obtained on draw",
                                    "parent": "100654",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100657,
                            "text": "CTA chest needed to be obtained to tule out aortic dissection",
                            "parent": "100650",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100658,
                            "text": "MRI needed for wake up stroke protocol",
                            "parent": "100650",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100659,
                            "text": "Patient is determined to have had recent surgery and more detailed surgical history was needed",
                            "parent": "100650",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100660,
                            "text": "Additional information became available which did not exist upon initial assessment",
                            "parent": "100650",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100661,
                    "text": "Delays related to wait for radiology",
                    "parent": "100625",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100662,
                            "text": "Unable to view imaging and radiology interpretation needed",
                            "parent": "100661",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100663,
                            "text": "Questionable abnormality and radiology interpretation needed",
                            "parent": "100661",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 101286,
                    "text": "Not Applicable (see comments)",
                    "parent": "100625",
                    "state": {
                        "opened": true
                    },
                    "children": [],
                    "workflowid": null
                }
            ],
            "workflowid": null
        },
        {
            "id": 100664,
            "text": "Delayed Thrombolytic Administration \t",
            "parent": "#",
            "state": {
                "opened": true
            },
            "children": [
                {
                    "id": 100665,
                    "text": "Process Delays (transport, rooming, radiology hold)",
                    "parent": "100664",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100666,
                            "text": "Delays in transportation to or from CT related",
                            "parent": "100665",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100667,
                                    "text": "No stretcher available",
                                    "parent": "100666",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100668,
                                    "text": "Transport not available",
                                    "parent": "100666",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100669,
                            "text": "Delayed due to excessive time in advanced imaging after the thrombolytic decision",
                            "parent": "100665",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100670,
                                    "text": "Poor IV access",
                                    "parent": "100669",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100671,
                                    "text": "Radiology technician delays",
                                    "parent": "100669",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100672,
                                    "text": "Washout after perfusion scan needed before CTA",
                                    "parent": "100669",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100673,
                            "text": "Absence of IV access at the time of MDM",
                            "parent": "100665",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100674,
                                    "text": "No IV escalation procedure",
                                    "parent": "100673",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100675,
                    "text": "Absence of patient weight at the time of MDM",
                    "parent": "100664",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100676,
                            "text": "No scale available to measure weight",
                            "parent": "100675",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100677,
                            "text": "Transfer to weighted bed was delayed",
                            "parent": "100675",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100678,
                            "text": "Weighted stretcher in use, not availabile",
                            "parent": "100675",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100679,
                            "text": "Incorrect weight recorded",
                            "parent": "100675",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100680,
                            "text": "Weighted stretcher broken (Defect)",
                            "parent": "100675",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100681,
                            "text": "Estimated weight recorded and confirmation needed by actual weight",
                            "parent": "100675",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100682,
                            "text": "Early weight not obtained by staff",
                            "parent": "100675",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100683,
                    "text": "Delays related to blood pressure management",
                    "parent": "100664",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100684,
                            "text": "Delayed detection of hypertension ",
                            "parent": "100683",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100685,
                                    "text": "BP not available from EMS (Defect)",
                                    "parent": "100684",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100686,
                                    "text": "BP not repeated upon presentation to the ED by triage, or primary nurse (Defect)",
                                    "parent": "100684",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100687,
                                    "text": "BP not repeated at door upon EMS arrival (Defect)",
                                    "parent": "100684",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100688,
                                    "text": "BP not checked during CT",
                                    "parent": "100684",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100689,
                                    "text": "BP not checked timely",
                                    "parent": "100684",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100690,
                                    "text": "No activation of early Labetalol or hydralazine order: staff waiting for clear orders form physician (Unnecessary wait)",
                                    "parent": "100684",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100691,
                            "text": "Poor managemnt of hypertension ",
                            "parent": "100683",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100692,
                                    "text": "Antihypertensives not readily available (Defect)",
                                    "parent": "100691",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100693,
                                    "text": "Lack of communication of shortage of medicines to the team (Unnecessary wait)",
                                    "parent": "100691",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100694,
                                    "text": "Staff searching for materials, e.g infusion pump for cardene drip (Unnecessary wait)",
                                    "parent": "100691",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100695,
                                    "text": "Delayed BP management due to lack of communication of hypertension early on (defect)",
                                    "parent": "100691",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100696,
                            "text": "Prolonged time needed to reduce blood pressure despite aggressive management (new-black)",
                            "parent": "100683",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100697,
                            "text": "Equipment defect (Electronic BP cuff inaccurate) - under detection (new-black)",
                            "parent": "100683",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100698,
                    "text": "Delays related to prolonged mixing and delivery of thrombolytics",
                    "parent": "100664",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100699,
                            "text": "Lack of verbal early mixing/ pre-mixing: physician related",
                            "parent": "100698",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100700,
                                    "text": "Verbal order to mix not communicated/perceived clearly",
                                    "parent": "100699",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100701,
                                    "text": "No use of LB2S2 for patient selection for early mix",
                                    "parent": "100699",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100702,
                            "text": "Staff refusal of verbal early mixing/ pre-mixing",
                            "parent": "100698",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100703,
                            "text": "Lack of hospital Procedure of no mixing on verbal order",
                            "parent": "100698",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100704,
                            "text": "Mixing delays",
                            "parent": "100698",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100705,
                                    "text": "Staff insisting on written consent (Unnecessary Wait)",
                                    "parent": "100704",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100706,
                                    "text": "Late Initiation of mixing the medicine at bedside or centralized pharmacy",
                                    "parent": "100704",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100707,
                                    "text": "Pharmacist/ bed side RN consenting the patient again after consent already obtained by physician",
                                    "parent": "100704",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100708,
                                    "text": "Knowledge deficit technique related to mixing (Defect)",
                                    "parent": "100704",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100709,
                                    "text": "Lack of supplies within the stroke kit available to treat timely",
                                    "parent": "100704",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100710,
                                    "text": "Turnover of nursing without adequate orientation",
                                    "parent": "100704",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100711,
                                    "text": "Delays in mixing related to inadequate nursing staffing",
                                    "parent": "100704",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100712,
                                    "text": "Centralized pharmacy model: inadequate staffing (esp after hours) one pharmacist to cover large scope particularly at night leading to extra queue time until staff available to mix alteplase (Unnecessary Wait)",
                                    "parent": "100704",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        },
                        {
                            "id": 100713,
                            "text": "Delays in delivery and administration of thrombolytic medicine",
                            "parent": "100698",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": 100714,
                                    "text": "Administration of bolus through the pump- (requires availability of the pump to administer bolus vs. drawing up bolus and administering it separately) (Unnecessary Wait)",
                                    "parent": "100713",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100715,
                                    "text": "Delays in setting up thrombolytic infusion (Unnecessary Wait)",
                                    "parent": "100713",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100716,
                                    "text": "Delays in starting bolus related to unnecessary processes such as insertion of urinary catheter or second IV site prior to alteplase bolus (Unnecessary Wait)- best practices",
                                    "parent": "100713",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100717,
                                    "text": "Delay related to placement of second IV site",
                                    "parent": "100713",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100718,
                                    "text": "Patient transferred back to room prior to alteplase administration",
                                    "parent": "100713",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                },
                                {
                                    "id": 100719,
                                    "text": "Primary IV Access Issues",
                                    "parent": "100713",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": [],
                                    "workflowid": null
                                }
                            ],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100720,
                    "text": "Delays in thrombolytic administration related to patient factors",
                    "parent": "100664",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100721,
                            "text": "More extensive discussion on risks and benfits was requested by patient or family",
                            "parent": "100720",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100722,
                            "text": "Indecisive patient- first refused then agreed",
                            "parent": "100720",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100723,
                            "text": "Patient refusing to make decision until family arrives",
                            "parent": "100720",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100724,
                    "text": "Physician Medical Decision Making Delays",
                    "parent": "100664",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100725,
                            "text": "Required additional time to rectify possible contraindications",
                            "parent": "100724",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100726,
                            "text": "Complex patient presentation requiring additional time",
                            "parent": "100724",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100727,
                            "text": "Communication needed with other providers",
                            "parent": "100724",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100728,
                            "text": "Communication needed with other providers",
                            "parent": "100724",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100729,
                            "text": "Subtle symptoms that require more detailed assessment",
                            "parent": "100724",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        },
                        {
                            "id": 100730,
                            "text": "Additional information became available which did not exist upon initial assessment",
                            "parent": "100724",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 100731,
                    "text": "Delays related to ED provider ",
                    "parent": "100664",
                    "state": {
                        "opened": true
                    },
                    "children": [
                        {
                            "id": 100732,
                            "text": "More extensive discussion on risks and benefits was requested by ED physician",
                            "parent": "100731",
                            "state": {
                                "opened": true
                            },
                            "children": [],
                            "workflowid": null
                        }
                    ],
                    "workflowid": null
                },
                {
                    "id": 101287,
                    "text": "Not Applicable (see comments)",
                    "parent": "100664",
                    "state": {
                        "opened": true
                    },
                    "children": [],
                    "workflowid": null
                }
            ],
            "workflowid": null
        },
        {
            "id": 101289,
            "text": "s",
            "parent": "#",
            "state": {
                "opened": true
            },
            "children": [],
            "workflowid": null
        }
    ]

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
//     // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
//     //     file node as children.
//     let tree=TREE_DATA.reduce((h: { [x: string]: any; }, o: { text: string | number; }) => (h[o.text] = Object.assign({}, o), h), Object.create(null));
//    Object.keys(tree).reduce((h:any, key)=>{
//   tree[key].children= tree[key].children.reduce((h: { [x: string]: any; }, o: { text: string | number; }) => (h[o.text] = Object.assign({}, o), h), Object.create(null),[]);
// }, []);
//    console.log(TREE_DATA);
   
     
let tree =this.RCATree(TREE_DATA)    


const data = this.buildFileTree(tree , 0);

    // Notify the change.
    this.dataChange.next(data);
    console.log(data);
    
    
  }

  RCATree(nodes:any){
    let a;
    const obj = nodes.reduce((h: { [x: string]: any; }, o: { children: any; text: string | number; }) =>(h[o.text] = Object.assign({}, o), h), Object.create(null),[]);
          
   let helper= this.childrenMapper(obj);
   return helper

}
childrenMapper(obj:any){

 Object.keys(obj).reduce((h:any, key)=>{
    let current = obj[key].children   
    let type=typeof current
      if(current === '[]') { 
        
      } else {
        current=current.reduce((h: { [x: string]: any; }, o: { text: string | number; }) => (h[o.text] = Object.assign({}, o), h),Object.create(null),[]);
        obj[key]=current;   
            if(typeof current=='object'){
            this.childrenMapper(current);
            }
         }
    
     }, []);
    
   return obj
  }
  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */

  buildFileTree(obj: any, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {        
      let value = obj[key];
      const type=typeof value; 
      const node:any = new TodoItemNode(); 
    //   if(type ==='object'&& typeof key =='string'&&key!='workflowid'&&key!='state') {   
    
          node.item=key;
        //   console.log(key!='children'?key:'');
        //    }
               
     if (value != null) {     
        if (typeof value === 'object') {  
           
          node.children = this.buildFileTree(value, level+1); 
        
                     
        } else  {     
          
        //    if(typeof value !='string'&& typeof value !='number'){
            
               node.item = value; 
                     
        //    }
           
           
        }
      }      
        
         
    
   return accumulator.concat(typeof value !='string'&& typeof value !='number'&&type ==='object'&& typeof key =='string'&& key!='workflowid'&&key!='state'?node:[]);
      
    },[]);

  }

  /** Add an item to to-do list */

  insertItem(parent: TodoItemNode, name: string): TodoItemNode {
    
    if (!parent.children) {
      parent.children = [];
    }
    const newItem = { item: name } as TodoItemNode;
    parent.children.push(newItem);
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemAbove(node: TodoItemNode, name: string): TodoItemNode {
    const parentNode = this.getParentFromNodes(node);
    const newItem = { item: name } as TodoItemNode;
    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node), 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node), 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemBelow(node: TodoItemNode, name: string): TodoItemNode {
    const parentNode = this.getParentFromNodes(node);
    const newItem = { item: name } as TodoItemNode;
    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  getParentFromNodes(node: TodoItemNode): any {
    for (let i = 0; i < this.data.length; ++i) {
      const currentRoot = this.data[i];
      const parent = this.getParent(currentRoot, node);
      if (parent != null) {
        return parent;
      }
    }
    return null;
  }

  getParent(currentRoot: TodoItemNode, node: TodoItemNode): any {
    if (currentRoot.children && currentRoot.children.length > 0) {
      for (let i = 0; i < currentRoot.children.length; ++i) {
        const child = currentRoot.children[i];
        if (child === node) {
          return currentRoot;
        } else if (child.children && child.children.length > 0) {
          const parent = this.getParent(child, node);
          if (parent != null) {
            return parent;
          }
        }
      }
    }
    return null;
  }

  updateItem(node: TodoItemNode, name: string) {  
    node.item = name;
    this.dataChange.next(this.data);  
  }

  deleteItem(node: TodoItemNode) {
    this.deleteNode(this.data, node);
    this.dataChange.next(this.data);
  }

  copyPasteItem(from: TodoItemNode, to: TodoItemNode): TodoItemNode {
    const newItem = this.insertItem(to, from.item);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemAbove(from: TodoItemNode, to: TodoItemNode): TodoItemNode {
    const newItem = this.insertItemAbove(to, from.item);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemBelow(from: TodoItemNode, to: TodoItemNode): TodoItemNode {
    const newItem = this.insertItemBelow(to, from.item);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  deleteNode(nodes: TodoItemNode[], nodeToDelete: TodoItemNode) {
    const index = nodes.indexOf(nodeToDelete, 0);
    if (index > -1) {
      nodes.splice(index, 1);
    } else {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          this.deleteNode(node.children, nodeToDelete);
        }
      });
    }
  }
}

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap:any = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap:any = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  /* Drag and drop */
  dragNode: any;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode: any;
  dragNodeExpandOverTime!: number;
  dragNodeExpandOverArea!: string;
  @ViewChild('emptyItem')
  emptyItem!: ElementRef;

  constructor(private database: ChecklistDatabase, private dialog: MatDialog) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
   

    database.dataChange.subscribe(data => {
      this.dataSource.data = [];
      this.dataSource.data = data;
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';
  toContentUpdate = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item ==='node' ;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = (node.children && node.children.length > 0);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {    
    const parentNode:any = this.flatNodeMap.get(node);
    this.database.insertItem(parentNode, '');
    this.treeControl.expand(node);
  }
  /** Save the node to database */
  saveNode(node: TodoItemNode, itemValue: string) {
    const nestedNode:any = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode, itemValue);
  }

  handleDragStart(event:any, node:any) {
    // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
    event.dataTransfer.setData('foo', 'bar');
    event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
    this.dragNode = node;
    this.treeControl.collapse(node);
  }

  handleDragOver(event:any, node:any) {
    event.preventDefault();

    // Handle node expand
    if (node === this.dragNodeExpandOverNode) {
      if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
        if ((new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
          this.treeControl.expand(node);
        }
      }
    } else {
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date().getTime();
    }

    // Handle drag area
    const percentageX = event.offsetX / event.target.clientWidth;
    const percentageY = event.offsetY / event.target.clientHeight;
    if (percentageY < 0.25) {
      this.dragNodeExpandOverArea = 'above';
    } else if (percentageY > 0.75) {
      this.dragNodeExpandOverArea = 'below';
    } else {
      this.dragNodeExpandOverArea = 'center';
    }
  }

  handleDrop(event:any, node:any) {
    event.preventDefault();
    if (node !== this.dragNode) {
      let newItem: TodoItemNode;
      if (this.dragNodeExpandOverArea === 'above') {
        newItem = this.database.copyPasteItemAbove(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      } else if (this.dragNodeExpandOverArea === 'below') {
        newItem = this.database.copyPasteItemBelow(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      } else {
        newItem = this.database.copyPasteItem(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      }
      this.database.deleteItem(this.flatNodeMap.get(this.dragNode));
      this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem));
    }
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  handleDragEnd(event: any) {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }


  RemoveItem(node:any){    
    const nestedNode:any = this.flatNodeMap.get(node);
    this.database.deleteItem(nestedNode);
    
  }

  updatItem(node:any,name:any){
    node.item=name;
console.log(this.dataSource.data.filter((value) => value.item === name)[0]=node);

    //  this.dataSource.data.filter((value) => value.item === name);    
  }

  openDialog(node:any): void {
    
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: node,
      
    });
}

}


