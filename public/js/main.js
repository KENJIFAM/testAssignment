const options1 = {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};
const options2 = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

let id, sortBy = 'date', sortType = -1;

const displayOrders = orders => {
  let list = '';
  orders.map((order, i) => {
    list += `<tr data-toggle='modal' data-target='#singleOrder' id='${order._id}'>
      <th scope='row'>${i + 1}</th>
      <td>${order.customer}</td>
      <td>
        <abbr title='${new Date(order.date).toLocaleString('en-US', options2)}'>
          ${new Date(order.date).toLocaleString('en-US', options1)}
        </abbr>
      </td>
      <td>${order.isDelivered ? 'Yes' : 'No'}</td>
      <td>${order.value}</td>
    </tr>`;
  });
  $('#table-body').html(list);
};

const getAllOrders = () => fetch('/orders?sortBy=' + sortBy + '&sortType=' + sortType)
  .then(response => response.json())
  .then(orders => displayOrders(orders))
  .catch(error => console.log(error));

const createOrder = order =>  fetch('/orders', {
    'method': 'POST',
    'body': JSON.stringify(order),
    'headers': new Headers({
      'Content-Type': 'application/json'
    })
  })
  .catch(error => console.log(error));

const getOrder = id => fetch('/orders/' + id)
  .then(response => response.json())
  .catch(error => console.log(error));

const deleteOrder = id => fetch('/orders/' + id, {'method': 'DELETE'})
  .catch(error => console.log(error));

$('#singleOrder').on('show.bs.modal', async (event) => {
  id = event.relatedTarget.id;
  const order = await getOrder(id);
  $('#singleOrderLabel').text(`${order.customer}'s order`);
  $('#orderDate').text(new Date(order.date).toLocaleString('en-US', options2));
  $('#orderIsDelivered').text(order.isDelivered ? 'Yes' : 'No');
  $('#orderValue').text(order.value);
});

$('#delete').on('click', async event => {
  await deleteOrder(id);
  await getAllOrders();
  $('#singleOrder').modal('hide');
  event.stopPropagation();
});

$('#new').on('click', () => {
  $('#alert').hide();
  $('#customer').val('');
  $('#date').val(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16));
  $('#isDelivered').val('');
  $('#value').val('');
});

$('#create').on('click', async () => {
  const customer = $('#customer').val().trim();
  const date = $('#date').val();
  const isDelivered = $('#isDelivered').val();
  let value = $('#value').val();
  if (!customer) {
    $('#alert').text("Please fill customer's name");
    $('#alert').show();
  } else {
    if (!value) value = 0;
    await createOrder({customer, date, isDelivered, value});
    await getAllOrders();
    $('#newOrder').modal('hide');
  }
});

$('#sort').on('change', event => {
  const value = event.target.value;
  sortBy = value < 2 ? 'date' : value < 4 ? 'customer' : 'value';
  sortType = value % 2 == 0 ? -1 : 1;
  getAllOrders();
  event.stopPropagation();
});

window.onload = getAllOrders;
