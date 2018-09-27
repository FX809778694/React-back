//Feature结构整理
export function format(value) {
  if (value) {
    const length = Object.keys(value).length,
      result = []

    for (let i = 1; i <= length / 2; i++) {
      if (value[`_name${i}`] || value[`_value${i}`]) {
        result.push(
          {
            _name: value[`_name${i}`],
            _value: value[`_value${i}`]
          }
        )
      }
    }
    return result
  }
}

//Feature结构回整
export function reFormat(value) {
  if(value) {
    const length = value.length,
      result = {}

    for (let i = 1; i <= length; i++) {
      result[`_name${i}`] = value[i - 1]._name
      result[`_value${i}`] = value[i - 1]._value
    }
    return result
  }
}

//问卷试题结构整理
export function quesFormat(value) {
  if (value) {
    const quesLength = value.keys.length,
      result = []

    for (let i = 0; i < quesLength; i++) {
      let key = value.keys[i]
      const option = []
      let optionsLength = value[`optionKeys_${key}`].length
      if(value[`questionTitle_${key}`] || value[`type_${key}`] || value[`displayOrder_${key}`] || value[`questionId_${key}`]) {
        for (let n = 0; n < optionsLength; n++){
          let optionKey = value[`optionKeys_${key}`]
          if(value[`${key}_${optionKey[n]}`] || value[`${key}_checked_${optionKey[n]}`] || value[`${key}_optionId_${optionKey[n]}`]) {
            option.push(
              {
                optionTitle: value[`${key}_${optionKey[n]}`],
                isCorrect: value[`${key}_checked_${optionKey[n]}`] ? 1 : 0,
                id: value[`${key}_optionId_${optionKey[n]}`]
              }
            )
          }
        }
        result.push(
          {
            questionTitle: value[`questionTitle_${key}`],
            type: value[`type_${key}`],
            displayOrder: value[`displayOrder_${key}`],
            id: value[`questionId_${key}`],
            options: option
          }
        )
      }
    }
    return result
  }
}

//问卷试题结构回整
export function quesReFormat(value) {
  if(value) {
    const quesLength = value.length,
      result = {},
      keys = []
    for(let i = 1; i <= quesLength; i++){
      keys.push(i)
      result['keys'] = keys
      result[`options_${i}`] = []
      result[`options_${i}`][`optionKeys_${i}`] = []
      result[`questionId_${i}`] = value[i-1].id
      result[`questionTitle_${i}`] = value[i-1].questionTitle
      result[`displayOrder_${i}`] = value[i-1].displayOrder
      result[`type_${i}`] = value[i-1].type
      const optionLength = value[i-1].options.length
      for(let n = 1; n <= optionLength; n++) {
        result[`options_${i}`][`optionKeys_${i}`].push(n)
        result[`options_${i}`][`${i}_${n}`] = value[i-1].options[n-1].optionTitle
        result[`options_${i}`][`${i}_checked_${n}`] = value[i-1].options[n-1].isCorrect
        result[`options_${i}`][`${i}_optionId_${n}`] = value[i-1].options[n-1].id
      }
    }
    return result
  }
}
