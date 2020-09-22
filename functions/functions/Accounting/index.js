const functions = require('firebase-functions')
const moment = require('moment')
const admin = require('firebase-admin')

//Var from book

let snapData = {}
let context = {}
let businessID = ''
let docID = ''

// booking too
let docBook = {}
let docBookMonth = {}
let docBookBranch = {}
let docBookBranchMonth = {}

//Assets
let docAssets = {}
let docAssetsMonth = {}
let docAssetsBranch = {}
let docAssetsBranchMonth = {}

//Liability
let docLiability = {}
let docLiabilityMonth = {}
let docLiabilityBranch = {}
let docLiabilityBranchMonth = {}

//Equity
let docEquity = {}
let docEquityMonth = {}
let docEquityBranch = {}
let docEquityBranchMonth = {}

//Expense
let docExpense = {}
let docExpenseMonth = {}
let docExpenseBranch = {}
let docExpenseBranchMonth = {}

//Income
let docIncome = {}
let docIncomeMonth = {}
let docIncomeBranch = {}
let docIncomeBranchMonth = {}

//Inventory
let docInventory = {}
let docInventoryMonth = {}
let docInventoryBranch = {}
let docInventoryBranchMonth = {}

// Variables created for Allocation

let docTotal = {}
let docMonth = {}
let docBranch = {}
let docBranchMonth = {}

let docTotalInventory = {}
let docMonthInventory = {}
let docBranchInventory = {}
let docBranchMonthInventory = {}

let docTotalAssets = {}
let docMonthAssets = {}
let docBranchAssets = {}
let docBranchMonthAssets = {}

let docTotalLiability = {}
let docMonthLiability = {}
let docBranchLiability = {}
let docBranchMonthLiability = {}

let docTotalEquity = {}
let docMonthEquity = {}
let docBranchEquity = {}
let docBranchMonthEquity = {}

let docTotalIncome = {}
let docMonthIncome = {}
let docBranchIncome = {}
let docBranchMonthIncome = {}

let docTotalExpense = {}
let docMonthExpense = {}
let docBranchExpense = {}
let docBranchMonthExpense = {}

let Allocation = {}
let AllocationMonth = {}
let AllocationBranch = {}
let AllocationBranchMonth = {}

let allDataInc = {}

let dataToUse = {}
let dataToUseAssets = {}
let dataToUseLiabilities = {}
let dataToUseExpense = {}
let dataToUseIncome = {}
let dataToUseEquity = {}

//Assets
function addAssets(assTo) {
  return docAssets
    .get()
    .then(doc => {
      if (doc.exists) {
        docTotalAssets = doc.data()
        let data = Object.entries(assTo)
        for (let i = 0; i < data.length; i++) {
          if (docTotalAssets[data[i][0]]) {
            docTotalAssets[data[i][0]].val =
              docTotalAssets[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docTotalAssets[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docTotalAssets[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docTotalAssets[data[i][1]])]
        }
      } else {
        return docAssets
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addAssets(assTo))
      }
    })
    .then(() => {
      return docAssets.update(docTotalAssets).then(() => {
        addAssetsMonth(assTo)
      })
    })
}

function addAssetsMonth(assTo) {
  return docAssetsMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docMonthAssets = doc.data()
        let data = Object.entries(assTo)
        for (let i = 0; i < data.length; i++) {
          if (docMonthAssets[data[i][0]]) {
            docMonthAssets[data[i][0]].val =
              docMonthAssets[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docMonthAssets[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docMonthAssets[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docMonthAssets[data[i][1]])]
        }
      } else {
        return docAssetsMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addAssetsMonth(assTo))
      }
    })
    .then(() => {
      return docAssetsMonth.update(docMonthAssets).then(() => {
        addAssetsBranch(assTo)
      })
    })
}

function addAssetsBranch(assTo) {
  return docAssetsBranch
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchAssets = doc.data()
        let data = Object.entries(assTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchAssets[data[i][0]]) {
            docBranchAssets[data[i][0]].val =
              docBranchAssets[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchAssets[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchAssets[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchAssets[data[i][1]])]
        }
      } else {
        return docAssetsBranch
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addAssetsBranch(assTo))
      }
    })
    .then(() => {
      return docAssetsBranch.update(docBranchAssets).then(() => {
        addAssetsBranchMonth(assTo)
      })
    })
}

function addAssetsBranchMonth(assTo) {
  return docAssetsBranchMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchMonthAssets = doc.data()
        let data = Object.entries(assTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchMonthAssets[data[i][0]]) {
            docBranchMonthAssets[data[i][0]].val =
              docBranchMonthAssets[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchMonthAssets[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchMonthAssets[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchMonthAssets[data[i][1]])]
        }
      } else {
        return docAssetsBranchMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addAssetsBranchMonth(assTo))
      }
    })
    .then(() => {
      return docAssetsBranchMonth.update(docTotalAssets)
    })
}

//Liability
function addLiability(liabTo) {
  return docLiability
    .get()
    .then(doc => {
      if (doc.exists) {
        docTotalLiability = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docTotalLiability[data[i][0]]) {
            docTotalLiability[data[i][0]].val =
              docTotalLiability[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docTotalLiability[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docTotalLiability[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docTotalLiability[data[i][1]])]
        }
      } else {
        return docLiability
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addLiability(liabTo))
      }
    })
    .then(() => {
      return docLiability.update(docTotalLiability).then(() => {
        addLiabilityMonth(liabTo)
      })
    })
}

function addLiabilityMonth(liabTo) {
  return docLiabilityMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docMonthLiability = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docMonthLiability[data[i][0]]) {
            docMonthLiability[data[i][0]].val =
              docMonthLiability[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docMonthLiability[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docMonthLiability[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docMonthLiability[data[i][1]])]
        }
      } else {
        return docLiabilityMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addLiabilityMonth(liabTo))
      }
    })
    .then(() => {
      return docLiabilityMonth.update(docMonthLiability).then(() => {
        addLiabilityBranch(liabTo)
      })
    })
}

function addLiabilityBranch(liabTo) {
  return docLiabilityBranch
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchLiability = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchLiability[data[i][0]]) {
            docBranchLiability[data[i][0]].val =
              docBranchLiability[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchLiability[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchLiability[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchLiability[data[i][1]])]
        }
      } else {
        return docLiabilityBranch
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addLiabilityBranch(liabTo))
      }
    })
    .then(() => {
      return docLiabilityBranch.update(docBranchLiability).then(() => {
        addLiabilityBranchMonth(liabTo)
      })
    })
}

function addLiabilityBranchMonth(liabTo) {
  return docLiabilityBranchMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchMonthLiability = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchMonthLiability[data[i][0]]) {
            docBranchMonthLiability[data[i][0]].val =
              docBranchMonthLiability[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchMonthLiability[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchMonthLiability[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchMonthLiability[data[i][1]])]
        }
      } else {
        return docLiabilityBranchMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addLiabilityBranchMonth(liabTo))
      }
    })
    .then(() => {
      return docLiabilityBranchMonth.update(docTotalLiability)
    })
}

//Inventory
function addInventory(assTo) {
  return docInventory
    .get()
    .then(doc => {
      if (doc.exists) {
        docTotalInventory = doc.data()
        let data = Object.entries(assTo)
        for (let i = 0; i < data.length; i++) {
          if (docTotalInventory[data[i][0]]) {
            docTotalInventory[data[i][0]].val =
              docTotalInventory[data[i][0]].val + data[i][1].val
            docTotalInventory[data[i][0]].qty =
              docTotalInventory[data[i][0]].qty + data[i][1].qty
            for (let e = 0; e < data[i][1].data.length; e++) {
              docTotalInventory[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docTotalInventory[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docTotalInventory[data[i][1]])]
        }
      } else {
        return docInventory
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addInventory(assTo))
      }
    })
    .then(() => {
      return docInventory.update(docTotalInventory).then(() => {
        addInventoryMonth(assTo)
      })
    })
}

function addInventoryMonth(assTo) {
  return docInventoryMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docMonthInventory = doc.data()
        let data = Object.entries(assTo)
        for (let i = 0; i < data.length; i++) {
          if (docMonthInventory[data[i][0]]) {
            docMonthInventory[data[i][0]].val =
              docMonthInventory[data[i][0]].val + data[i][1].val
            docTotalInventory[data[i][0]].qty =
              docTotalInventory[data[i][0]].qty + data[i][1].qty
            for (let e = 0; e < data[i][1].data.length; e++) {
              docMonthInventory[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docMonthInventory[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docMonthInventory[data[i][1]])]
        }
      } else {
        return docInventoryMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addInventoryMonth(assTo))
      }
    })
    .then(() => {
      return docInventoryMonth.update(docMonthInventory).then(() => {
        addInventoryBranch(assTo)
      })
    })
}

function addInventoryBranch(assTo) {
  return docInventoryBranch
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchInventory = doc.data()
        let data = Object.entries(assTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchInventory[data[i][0]]) {
            docBranchInventory[data[i][0]].val =
              docBranchInventory[data[i][0]].val + data[i][1].val
            docTotalInventory[data[i][0]].qty =
              docTotalInventory[data[i][0]].qty + data[i][1].qty
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchInventory[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchInventory[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchInventory[data[i][1]])]
        }
      } else {
        return docInventoryBranch
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addInventoryBranch(assTo))
      }
    })
    .then(() => {
      return docInventoryBranch.update(docBranchInventory).then(() => {
        addInventoryBranchMonth(assTo)
      })
    })
}

function addInventoryBranchMonth(assTo) {
  return docInventoryBranchMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchMonthInventory = doc.data()
        let data = Object.entries(assTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchMonthInventory[data[i][0]]) {
            docBranchMonthInventory[data[i][0]].val =
              docBranchMonthInventory[data[i][0]].val + data[i][1].val
            docTotalInventory[data[i][0]].qty =
              docTotalInventory[data[i][0]].qty + data[i][1].qty
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchMonthInventory[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchMonthInventory[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchMonthInventory[data[i][1]])]
        }
      } else {
        return docInventoryBranchMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addInventoryBranchMonth(assTo))
      }
    })
    .then(() => {
      return docInventoryBranchMonth.update(docTotalInventory)
    })
}

//Expense
function addExpense(expTo) {
  return docExpense
    .get()
    .then(doc => {
      if (doc.exists) {
        docTotalExpense = doc.data()
        let data = Object.entries(expTo)
        for (let i = 0; i < data.length; i++) {
          if (docTotalExpense[data[i][0]]) {
            docTotalExpense[data[i][0]].val =
              docTotalExpense[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docTotalExpense[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docTotalExpense[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docTotalExpense[data[i][1]])]
        }
      } else {
        return docExpense
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addExpense(expTo))
      }
    })
    .then(() => {
      return docExpense.update(docTotalExpense).then(() => {
        addExpenseMonth(expTo)
      })
    })
}

function addExpenseMonth(expTo) {
  return docExpenseMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docMonthExpense = doc.data()
        let data = Object.entries(expTo)
        for (let i = 0; i < data.length; i++) {
          if (docMonthExpense[data[i][0]]) {
            docMonthExpense[data[i][0]].val =
              docMonthExpense[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docMonthExpense[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docMonthExpense[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docMonthExpense[data[i][1]])]
        }
      } else {
        return docExpenseMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addExpenseMonth(expTo))
      }
    })
    .then(() => {
      return docExpenseMonth.update(docMonthExpense).then(() => {
        addExpenseBranch(expTo)
      })
    })
}

function addExpenseBranch(expTo) {
  return docExpenseBranch
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchExpense = doc.data()
        let data = Object.entries(expTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchExpense[data[i][0]]) {
            docBranchExpense[data[i][0]].val =
              docBranchExpense[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchExpense[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchExpense[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchExpense[data[i][1]])]
        }
      } else {
        return docExpenseBranch
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addExpenseBranch(expTo))
      }
    })
    .then(() => {
      return docExpenseBranch.update(docBranchExpense).then(() => {
        addExpenseBranchMonth(expTo)
      })
    })
}

function addExpenseBranchMonth(expTo) {
  return docExpenseBranchMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchMonthExpense = doc.data()
        let data = Object.entries(expTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchMonthExpense[data[i][0]]) {
            docBranchMonthExpense[data[i][0]].val =
              docBranchMonthExpense[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchMonthExpense[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchMonthExpense[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchMonthExpense[data[i][1]])]
        }
      } else {
        return docExpenseBranchMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addExpenseBranchMonth(expTo))
      }
    })
    .then(() => {
      return docExpenseBranchMonth.update(docTotalExpense)
    })
}

//Income
function addIncome(liabTo) {
  return docIncome
    .get()
    .then(doc => {
      if (doc.exists) {
        docTotalIncome = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docTotalIncome[data[i][0]]) {
            docTotalIncome[data[i][0]].val =
              docTotalIncome[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docTotalIncome[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docTotalIncome[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docTotalIncome[data[i][1]])]
        }
      } else {
        return docIncome
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addIncome(liabTo))
      }
    })
    .then(() => {
      return docIncome.update(docTotalIncome).then(() => {
        addIncomeMonth(liabTo)
      })
    })
}

function addIncomeMonth(liabTo) {
  return docIncomeMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docMonthIncome = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docMonthIncome[data[i][0]]) {
            docMonthIncome[data[i][0]].val =
              docMonthIncome[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docMonthIncome[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docMonthIncome[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docMonthIncome[data[i][1]])]
        }
      } else {
        return docIncomeMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addIncomeMonth(liabTo))
      }
    })
    .then(() => {
      return docIncomeMonth.update(docMonthIncome).then(() => {
        addIncomeBranch(liabTo)
      })
    })
}

function addIncomeBranch(liabTo) {
  return docIncomeBranch
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchIncome = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchIncome[data[i][0]]) {
            docBranchIncome[data[i][0]].val =
              docBranchIncome[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchIncome[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchIncome[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchIncome[data[i][1]])]
        }
      } else {
        return docIncomeBranch
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addIncomeBranch(liabTo))
      }
    })
    .then(() => {
      return docIncomeBranch.update(docBranchIncome).then(() => {
        addIncomeBranchMonth(liabTo)
      })
    })
}

function addIncomeBranchMonth(liabTo) {
  return docIncomeBranchMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchMonthIncome = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchMonthIncome[data[i][0]]) {
            docBranchMonthIncome[data[i][0]].val =
              docBranchMonthIncome[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchMonthIncome[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchMonthIncome[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchMonthIncome[data[i][1]])]
        }
      } else {
        return docIncomeBranchMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addIncomeBranchMonth(liabTo))
      }
    })
    .then(() => {
      return docIncomeBranchMonth.update(docTotalIncome)
    })
}

//Equity
function addEquity(liabTo) {
  return docEquity
    .get()
    .then(doc => {
      if (doc.exists) {
        docTotalEquity = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docTotalEquity[data[i][0]]) {
            docTotalEquity[data[i][0]].val =
              docTotalEquity[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docTotalEquity[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docTotalEquity[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docTotalEquity[data[i][1]])]
        }
      } else {
        return docEquity
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addEquity(liabTo))
      }
    })
    .then(() => {
      return docEquity.update(docTotalEquity).then(() => {
        addEquityMonth(liabTo)
      })
    })
}

function addEquityMonth(liabTo) {
  return docEquityMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docMonthEquity = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docMonthEquity[data[i][0]]) {
            docMonthEquity[data[i][0]].val =
              docMonthEquity[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docMonthEquity[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docMonthEquity[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docMonthEquity[data[i][1]])]
        }
      } else {
        return docEquityMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addEquityMonth(liabTo))
      }
    })
    .then(() => {
      return docEquityMonth.update(docMonthEquity).then(() => {
        addEquityBranch(liabTo)
      })
    })
}

function addEquityBranch(liabTo) {
  return docEquityBranch
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchEquity = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchEquity[data[i][0]]) {
            docBranchEquity[data[i][0]].val =
              docBranchEquity[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchEquity[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchEquity[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchEquity[data[i][1]])]
        }
      } else {
        return docEquityBranch
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addEquityBranch(liabTo))
      }
    })
    .then(() => {
      return docEquityBranch.update(docBranchEquity).then(() => {
        addEquityBranchMonth(liabTo)
      })
    })
}

function addEquityBranchMonth(liabTo) {
  return docEquityBranchMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchMonthEquity = doc.data()
        let data = Object.entries(liabTo)
        for (let i = 0; i < data.length; i++) {
          if (docBranchMonthEquity[data[i][0]]) {
            docBranchMonthEquity[data[i][0]].val =
              docBranchMonthEquity[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchMonthEquity[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchMonthEquity[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docBranchMonthEquity[data[i][1]])]
        }
      } else {
        return docEquityBranchMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addEquityBranchMonth(liabTo))
      }
    })
    .then(() => {
      return docEquityBranchMonth.update(docTotalEquity)
    })
}

//Book
function addBook() {
  return docBook
    .get()
    .then(doc => {
      if (doc.exists) {
        docTotal = doc.data()
        let data = Object.entries(dataToUse)
        for (let i = 0; i < data.length; i++) {
          if (docTotal[data[i][0]]) {
            docTotal[data[i][0]].val = docTotal[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docTotal[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docTotal[data[i][0]] = data[i][1]
          }
          Allocation[(data[i][0] = docTotal[data[i][1]])]
        }
      } else {
        return docBook
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addBook())
      }
    })
    .then(() => {
      return docBook.update(docTotal).then(() => {
        addBookMonth()
      })
    })
}
function addBookMonth() {
  return docBookMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docMonth = doc.data()
        let data = Object.entries(dataToUse)
        for (let i = 0; i < data.length; i++) {
          if (docMonth[data[i][0]]) {
            docMonth[data[i][0]].val = docMonth[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docMonth[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docMonth[data[i][0]] = data[i][1]
          }
          AllocationMonth[(data[i][0] = docMonth[data[i][1]])]
        }
      } else {
        return docBookMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addBookMonth())
      }
    })
    .then(() => {
      return docBookMonth.update(docMonth).then(() => {
        addBranch()
      })
    })
}
function addBranch() {
  return docBookBranch
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranch = doc.data()
        let data = Object.entries(dataToUse)
        for (let i = 0; i < data.length; i++) {
          if (docBranch[data[i][0]]) {
            docBranch[data[i][0]].val =
              docBranch[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranch[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranch[data[i][0]] = data[i][1]
          }
          AllocationBranch[(data[i][0] = docBranch[data[i][1]])]
        }
      } else {
        return docBookBranch
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addBranch())
      }
    })
    .then(() => {
      return docBookBranch.update(docBranch).then(() => {
        addBranchMonth()
      })
    })
}
function addBranchMonth() {
  return docBookBranchMonth
    .get()
    .then(doc => {
      if (doc.exists) {
        docBranchMonth = doc.data()
        let data = Object.entries(dataToUse)
        for (let i = 0; i < data.length; i++) {
          if (docBranchMonth[data[i][0]]) {
            docBranchMonth[data[i][0]].val =
              docBranchMonth[data[i][0]].val + data[i][1].val
            for (let e = 0; e < data[i][1].data.length; e++) {
              docBranchMonth[data[i][0]].data.push(data[i][1].data[e])
            }
          } else {
            docBranchMonth[data[i][0]] = data[i][1]
          }
          AllocationBranchMonth[(data[i][0] = docBranchMonth[data[i][1]])]
        }
      } else {
        return docBookBranchMonth
          .set({
            last: moment().format('DD-MM-YYYY')
          })
          .then(() => addBranchMonth())
      }
    })
    .then(() => {
      return docBookBranchMonth.update(docBranchMonth)
    })
}

function setData() {
  if (snapData.entry_type == 'Asset Allocation') {
    let assTo = {}
    let liabTo = {}
    let sub_type = ''
    let sub_sub_type = ''
    let ass_name = snapData.ass_name
    let ass = snapData

    if (snapData.trans_type == 'Cash') {
      assTo.ass = {
        val: 0,
        data: [Number(snapData.t_cost), -Number(snapData.t_cost)]
      }

      assTo.Cash = {
        val: -Number(snapData.t_cost),
        data: [-Number(snapData.t_cost)]
      }

      if (snapData.ass_type == 'Fixed Assets') {
        assTo.f_ass = {
          val: Number(snapData.t_cost),
          data: [Number(snapData.t_cost)]
        }
        assTo.c_ass = {
          val: -Number(snapData.t_cost),
          data: [-Number(snapData.t_cost)]
        }

        sub_type = snapData.f_asset
      } else if (snapData.ass_type == 'Current Assets') {
        assTo.c_ass = {
          val: 0,
          data: [Number(snapData.t_cost), -Number(snapData.t_cost)]
        }

        sub_type = snapData.c_asset
        if (sub_type == 'Inventory') {
          sub_sub_type = snapData.inv
        }

        if (sub_type == 'Cash Equivalent') {
          sub_sub_type = snapData.c_eq
        }
      }
    } else if (snapData.trans_type == 'Credit') {
      assTo.ass = {
        val: snapData.l_amount,
        data: [Number(snapData.t_cost), -Number(snapData.dep)]
      }
      assTo.Cash = {
        val: -Number(snapData.dep),
        data: [-Number(snapData.dep)]
      }

      if (snapData.ass_type == 'Fixed Assets') {
        assTo.f_ass = {
          val: Number(snapData.t_cost),
          data: [Number(snapData.t_cost)]
        }

        assTo.c_ass = {
          val: -Number(snapData.dep),
          data: [-Number(snapData.dep)]
        }

        sub_type = snapData.f_asset
      } else if (snapData.ass_type == 'Current Assets') {
        assTo.c_ass = {
          val: Number(snapData.l_amount),
          data: [Number(snapData.t_cost), -Number(snapData.dep)]
        }
      }

      sub_type = snapData.c_asset
      if (sub_type == 'Inventory') {
        sub_sub_type = snapData.inv
      }

      if (sub_type == 'Cash Equivalent') {
        sub_sub_type = snapData.c_eq
      }

      liabTo.liab = {
        val: Number(snapData.l_amount),
        data: [Number(snapData.l_amount)]
      }

      liabTo.f_liab = {
        val: Number(snapData.l_amount),
        data: [Number(snapData.l_amount)]
      }

      let liab = {
        dep: snapData.dep,
        l_amount: snapData.l_amount,
        l_term: snapData.l_term,
        interest: snapData.interest,
        interest_type: snapData.interest_type,
        liab_type: snapData.liab_type,
        t_liab: snapData.t_liab,
        f_liab: snapData.f_liab
      }
      Object.keys(liab).forEach(function(key) {
        delete ass[key]
      })
      dataToUseLiabilities = { ...allDataInc, ...liab }
      // addLiability(liabTo)
      // addLiabilityMonth(liabTo)
      // addLiabilityBranch(liabTo)
      // addLiabilityBranchMonth(liabTo)
    }

    if (ass_name) {
      assTo[ass_name] = {
        val: Number(snapData.t_cost),
        data: [Number(snapData.t_cost)],
        qty: Number(snapData.qty),
        price: Number(snapData.i_cost)
      }
    }

    if (sub_type) {
      assTo[sub_type] = {
        val: Number(snapData.t_cost),
        data: [Number(snapData.t_cost)]
      }
    }

    if (sub_sub_type) {
      assTo[sub_sub_type] = {
        val: Number(snapData.t_cost),
        data: [Number(snapData.t_cost)]
      }
    }

    dataToUseAssets = { ...allDataInc, ...ass }

    dataToUse = { ...liabTo, ...assTo }
    addBook()
    // addBookMonth()
    // addBranch()
    // addBranchMonth()

    // addAssets(assTo)
    // addAssetsMonth(assTo)
    // addAssetsBranch(assTo)
    // addAssetsBranchMonth(assTo)

    if (sub_type == 'Inventory') {
      let data = assTo
      let rem = {
        ass: {},
        c_ass: {},
        f_ass: {}
      }
      Object.keys(rem).forEach(function(key) {
        delete data[key]
      })
      addInventory(data)
      // addInventoryMonth(data)
      // addInventoryBranch(data)
      // addInventoryBranchMonth(data)
    }
  } else if (snapData.entry_type == 'Equity Allocation') {
    console.log('Equity')
    let assTo = {}
    let equityTo = {}

    assTo.ass = {
      val: Number(snapData.t_cost),
      data: [Number(snapData.t_cost)]
    }

    assTo.Cash = {
      val: Number(snapData.t_cost),
      data: [Number(snapData.t_cost)]
    }
    assTo.c_ass = {
      val: Number(snapData.t_cost),
      data: [Number(snapData.t_cost)]
    }

    equityTo.eq = {
      val: Number(snapData.t_cost),
      data: [Number(snapData.t_cost)]
    }

    equityTo[snapData.eq_type] = {
      val: Number(snapData.t_cost),
      data: [Number(snapData.t_cost)]
    }

    dataToUse = { ...equityTo, ...assTo }
    addBook()
    // addBookMonth()
    // addBranch()
    // addBranchMonth()

    addAssets(assTo)
    // addAssetsMonth(assTo)
    // addAssetsBranch(assTo)
    // addAssetsBranchMonth(assTo)

    // addEquity(equityTo)
    // addEquityMonth(equityTo)
    // addEquityBranch(equityTo)
    // addEquityBranchMonth(equityTo)
  } else if (snapData.entry_type == 'Liability Allocation') {
    console.log('Liability')
  } else if (snapData.entry_type == 'Income Allocation') {
    console.log('Income')
  } else if (snapData.entry_type == 'Expense Allocation') {
    console.log('Expense')
    let assTo = {}
    let liabTo = {}
    let expTo = {}
    let eqTo = {}

    let ass = snapData

    if (snapData.trans_type == 'Cash') {
      assTo.ass = {
        val: -Number(snapData.t_cost),
        data: [-Number(snapData.t_cost)]
      }

      assTo.Cash = {
        val: -Number(snapData.t_cost),
        data: [-Number(snapData.t_cost)]
      }

      assTo.c_ass = {
        val: -Number(snapData.t_cost),
        data: [-Number(snapData.t_cost)]
      }
    } else if (snapData.trans_type == 'Credit') {
      assTo.ass = {
        val: -Number(snapData.dep),
        data: [-Number(snapData.dep)]
      }
      assTo.Cash = {
        val: -Number(snapData.dep),
        data: [-Number(snapData.dep)]
      }

      assTo.c_ass = {
        val: -Number(snapData.dep),
        data: [-Number(snapData.dep)]
      }

      liabTo.liab = {
        val: Number(snapData.l_amount),
        data: [Number(snapData.l_amount)]
      }

      liabTo.f_liab = {
        val: Number(snapData.l_amount),
        data: [Number(snapData.l_amount)]
      }

      let liab = {
        dep: snapData.dep,
        l_amount: snapData.l_amount,
        l_term: snapData.l_term,
        interest: snapData.interest,
        interest_type: snapData.interest_type,
        liab_type: snapData.liab_type,
        t_liab: snapData.t_liab,
        f_liab: snapData.f_liab
      }
      Object.keys(liab).forEach(function(key) {
        delete ass[key]
      })
      dataToUseLiabilities = { ...allDataInc, ...liab }
      // addLiability(liabTo)
      // addLiabilityMonth(liabTo)
      // addLiabilityBranch(liabTo)
      // addLiabilityBranchMonth(liabTo)
    }

    expTo.exp = {
      val: Number(snapData.t_cost),
      data: [Number(snapData.t_cost)]
    }

    expTo[snapData.exp_name] = {
      val: Number(snapData.t_cost),
      data: [Number(snapData.t_cost)]
    }

    expTo[snapData.exp_type] = {
      val: Number(snapData.t_cost),
      data: [Number(snapData.t_cost)]
    }

    eqTo.eq = {
      val: -Number(snapData.t_cost),
      data: -[Number(snapData.t_cost)]
    }

    eqTo.exp = {
      val: Number(snapData.t_cost),
      data: [Number(snapData.t_cost)]
    }

    dataToUse = { ...expTo, ...liabTo, ...assTo, ...eqTo }

    addBook()
    // addBookMonth()
    // addBranch()
    // addBranchMonth()

    // addAssets(assTo)
    // addAssetsMonth(assTo)
    // addAssetsBranch(assTo)
    // addAssetsBranchMonth(assTo)

    // addExpense(expTo)
    // addExpenseMonth(expTo)
    // addExpenseBranch(expTo)
    // addExpenseBranchMonth(expTo)

    // addEquity(eqTo)
    // addEquityMonth(eqTo)
    // addEquityBranch(eqTo)
    // addEquityBranchMonth(eqTo)
  } else if (snapData.entry_type == 'Sales Allocation') {
    let assTo = {}
    let incTo = {}
    let eqTo = {}

    let ass_name = snapData.ass_name
    let ass = snapData

    assTo.ass = {
      val: -Number(snapData.t_cost),
      data: [-Number(snapData.t_cost)]
    }

    assTo.c_ass = {
      val: -Number(snapData.t_cost),
      data: [-Number(snapData.t_cost)]
    }

    assTo[ass_name] = {
      val: -Number(snapData.t_cost),
      data: [-Number(snapData.t_cost)],
      qty: -Number(snapData.qty),
      price: Number(snapData.i_cost)
    }

    assTo['Inventory'] = {
      val: -Number(snapData.t_cost),
      data: [-Number(snapData.t_cost)]
    }

    assTo['Finished Goods'] = {
      val: -Number(snapData.t_cost),
      data: [-Number(snapData.t_cost)]
    }

    dataToUseAssets = { ...allDataInc, ...ass }

    dataToUse = { ...incTo, ...assTo, ...eqTo }
    addBook()

    // addAssets(assTo)

    let data = assTo
    let rem = {
      ass: {},
      c_ass: {}
    }
    Object.keys(rem).forEach(function(key) {
      delete data[key]
    })
    addInventory(data)
  } else if (snapData.entry_type == 'Profit Allocation') {
    let expTo = {}
    let incTo = {}
    let eqTo = {}
    let assTo = {}

    let price = snapData.t_price
    let profit = snapData.t_profit

    incTo.inc = {
      val: Number(price),
      data: [Number(price)]
    }

    incTo['Sales'] = {
      val: Number(price),
      data: [Number(price)]
    }

    eqTo.eq = {
      val: Number(profit),
      data: [Number(profit)]
    }

    dataToUse = { ...incTo }
    addBook()
    // addAssets(assTo)
    // addExpense(expTo)

    // addEquity(eqTo)
    // addIncome(incTo)
  } else if (snapData.entry_type == 'Purchase Allocation') {
    for (let i = 0; i < snapData.c_items.length; i++) {
      let myData = snapData.c_items[i]

      let assTo = {}
      let incTo = {}
      let eqTo = {}
      let sub_type = ''
      let sub_sub_type = ''
      let ass_name = snapData.c_items[i].product_name
      let ass = myData

      let val = snapData.c_items[i].price * snapData.c_items[i].quantity

      assTo.ass = {
        val: 0,
        data: [Number(val), -Number(val)]
      }

      assTo.Cash = {
        val: -Number(val),
        data: [-Number(val)]
      }

      assTo.c_ass = {
        val: 0,
        data: [Number(val), -Number(val)]
      }

      assTo[ass_name] = {
        val: Number(val),
        data: [Number(val)],
        qty: Number(snapData.c_items[i].quantity),
        price: Number(snapData.c_items[i].price)
      }

      assTo['Inventory'] = {
        val: Number(val),
        data: [Number(val)]
      }

      assTo['Finished Goods'] = {
        val: Number(val),
        data: [Number(val)]
      }

      incTo.exp = {
        val: Number(val),
        data: [Number(val)]
      }

      incTo['Purchases'] = {
        val: Number(val),
        data: [Number(val)]
      }

      incTo['Supplies Expense'] = {
        val: Number(val),
        data: [Number(val)]
      }

      eqTo.eq = {
        val: -Number(val),
        data: [-Number(val)]
      }

      eqTo.exp = {
        val: Number(val),
        data: [Number(val)]
      }

      dataToUseAssets = { ...allDataInc, ...ass }

      dataToUse = { ...incTo, ...assTo, ...eqTo }
      addBook()

      // addAssets(assTo)

      // addExpense(incTo)

      // addEquity(eqTo)

      let data = assTo
      let rem = {
        ass: {},
        c_ass: {},
        f_ass: {}
      }
      Object.keys(rem).forEach(function(key) {
        delete data[key]
      })
      addInventory(data)
    }
  } else {
    console.log('none')
  }
}

exports.bookUpdate = functions.firestore
  .document('apps/crm/{businessID}/book/book/{bookID}')
  .onCreate((snap, context) => {
    snapData = snap.data()
    snapData.id = context.params.bookID
    businessID = context.params.businessID
    docID = context.params.bookID
    allDataInc = {
      uid: snapData.uid,
      ref: snapData.ref,
      entry_type: snapData.entry_type,
      branch: snapData.branch,
      last: snapData.last,
      date: snapData.date,
      month: snapData.month,
      timestamp: snapData.timestamp
    }

    //Total Books
    docBook = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection('total')
      .doc('total')

    docBookMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection('total')
      .doc(snapData.month)

    docBookBranch = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection(snapData.branch)
      .doc('total')

    docBookBranchMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection(snapData.branch)
      .doc(snapData.month)

    // Assets
    docAssets = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('assets')
      .collection('total')
      .doc('total')

    docAssetsMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('assets')
      .collection('total')
      .doc(snapData.month)

    docAssetsBranch = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('assets')
      .collection(snapData.branch)
      .doc('total')

    docAssetsBranchMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('assets')
      .collection(snapData.branch)
      .doc(snapData.month)

    // Liabilities
    docLiability = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('liability')
      .collection('total')
      .doc('total')

    docLiabilityMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('liability')
      .collection('total')
      .doc(snapData.month)

    docLiabilityBranch = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('liability')
      .collection(snapData.branch)
      .doc('total')

    docLiabilityBranchMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('liability')
      .collection(snapData.branch)
      .doc(snapData.month)

    // Equities
    docEquity = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('equity')
      .collection('total')
      .doc('total')

    docEquityMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('equity')
      .collection('total')
      .doc(snapData.month)

    docEquityBranch = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('equity')
      .collection(snapData.branch)
      .doc('total')

    docEquityBranchMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('equity')
      .collection(snapData.branch)
      .doc(snapData.month)

    // Expense
    docExpense = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('expense')
      .collection('total')
      .doc('total')

    docExpenseMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('expense')
      .collection('total')
      .doc(snapData.month)

    docExpenseBranch = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('expense')
      .collection(snapData.branch)
      .doc('total')

    docExpenseBranchMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('expense')
      .collection(snapData.branch)
      .doc(snapData.month)

    // Income
    docIncome = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('income')
      .collection('total')
      .doc('total')

    docIncomeMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('income')
      .collection('total')
      .doc(snapData.month)

    docIncomeBranch = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('income')
      .collection(snapData.branch)
      .doc('total')

    docIncomeBranchMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('income')
      .collection(snapData.branch)
      .doc(snapData.month)

    // Inventory
    docInventory = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('inventory')
      .collection('total')
      .doc('total')

    docInventoryMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('inventory')
      .collection('total')
      .doc(snapData.month)

    docInventoryBranch = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('inventory')
      .collection(snapData.branch)
      .doc('total')

    docInventoryBranchMonth = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('inventory')
      .collection(snapData.branch)
      .doc(snapData.month)

    setData()
  })
