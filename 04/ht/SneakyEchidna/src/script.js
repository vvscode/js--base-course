/**
 * Creates calendar configuration block
 * @param {*} htmlElement
 */
function drawConfigurationModule() {
  let wrapper = document.createElement('div');
  wrapper.appendChild(createConfigForm());
  document.body.appendChild(wrapper);
}
// TODO -- to much repetition. Need to add function that generates form content based on config
function createConfigForm() {
  let form = document.createElement('form');
  form.setAttribute('id', 'configForm');
  let fieldset = document.createElement('fieldset');
  form.appendChild(fieldset);
  let legend = document.createElement('legend');
  fieldset.appendChild(legend);
  legend.innerHTML = 'Configure Calendar';
  let wrapp = document.createElement('div');
  fieldset.appendChild(wrapp);

  let allowChangeMonthChb = document.createElement('input');
  allowChangeMonthChb.type = 'checkbox';
  allowChangeMonthChb.value = 'allowChangeMonth';
  allowChangeMonthChb.id = 'allowChangeMonth';
  allowChangeMonthChb.name = 'allowChangeMonth';
  let allowChangeMonthLbl = document.createElement('label');
  allowChangeMonthLbl.innerText = 'Allow change month';

  let allowAddTasksChb = document.createElement('input');
  allowAddTasksChb.type = 'checkbox';
  allowAddTasksChb.value = 'allowAddTasks';
  allowAddTasksChb.id = 'allowAddTasks';
  allowAddTasksChb.name = 'allowAddTasks';
  let allowAddTasksLbl = document.createElement('label');
  allowAddTasksLbl.innerText = 'Allow change month';

  let allowRemoveTasksChb = document.createElement('input');
  allowRemoveTasksChb.type = 'checkbox';
  allowRemoveTasksChb.value = 'allowRemoveTasks';
  allowRemoveTasksChb.id = 'allowRemoveTasks';
  allowRemoveTasksChb.name = 'allowRemoveTasks';
  let allowRemoveTasksLbl = document.createElement('label');
  allowRemoveTasksLbl.innerText = 'Allow remove tasks';

  let showMonthYearChb = document.createElement('input');
  showMonthYearChb.type = 'checkbox';
  showMonthYearChb.value = 'showMonthYear';
  showMonthYearChb.id = 'showMonthYear';
  showMonthYearChb.name = 'showMonthYear';
  let showMonthYearLbl = document.createElement('label');
  showMonthYearLbl.innerText = 'Show month year';

  let month = document.createElement('month');
  month.value = '2018-1';
  wrapp.appendChild(allowChangeMonthChb);
  wrapp.appendChild(allowChangeMonthLbl);
  wrapp.appendChild(allowAddTasksChb);
  wrapp.appendChild(allowAddTasksLbl);
  wrapp.appendChild(allowRemoveTasksChb);
  wrapp.appendChild(allowRemoveTasksLbl);
  wrapp.appendChild(showMonthYearChb);
  wrapp.appendChild(showMonthYearLbl);
  wrapp.appendChild(month);
  return form;
}
