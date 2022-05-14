### Design Database

|id|name|descript|
|-|-|-|-|
|1|Withdraw|ถอน|
|2|Deposit|ฝาก|
|3|Product|สินค้า|
|4|Product Master|มาสเตอร์ สินค้า|
|5|Customer|ลูกค้า|
|6|Point|พอยต์|
|7|Drawer|ลิ้นชักเก็บเงิน|
|8|Drawer History|ประวัติลิ้นชักเก็บเงิน|
|9|Transaction Order|ธุรกรรม|
|10|Employee|พนักงาน|
|11|Medal Machine|ตู้กดเหรียญ มากกว่า 1 สาขา|
|12|Email ForgotPassword History|ประวัติการลืมรหัสผ่าน|
 
### Withdraw
- _wid
- _mid
- _tid
- balance
- phone
- is_refund
- is_payment
- created_by
- created_at
- updated_by
- updated_at
- deleted_at

### Deposit
- _did
- _mid
- _tid
- balance
- phone
- is_refund
- is_payment
- created_by
- created_at
- updated_by
- updated_at
- deleted_at

### Master Product
- _mpid
- topic
- subject
- descript
- image_path
- cost_price
- selling_price
- tags
- point
- qty
- stock
- stock_warning
- is_view
- is_lock
- created_by
- created_at
- updated_by
- updated_at
- deleted_at
  
### Product
- _mid
- _pid
- topic
- subject
- descript
- image_path
- cost_price
- selling_price
- tags
- qty
- stock
- stock_warning
- is_view
- is_lock
- created_by
- created_at
- updated_by
- updated_at
- deleted_at
  
### Customer
- _cid
- name
- lastname
- phone
- email
- username
- password
- recommend
- is_verify
- is_delete
- twoFactor
- created_by
- created_at
- updated_by
- updated_at
- deleted_at

### Point
- _poid
- _pid
- _cid
- _mid
- balance
- created_by
- created_at
- updated_by
- updated_at
- deleted_at

### Drawer
- _dwid
- _mid
- one_coin
- two_coin
- five_coin
- twenty_coin
- one_hundred_coin
- five_hundred_coin
- one_thosand_coin
- created_by
- created_at
- updated_by
- updated_at
- deleted_at
  
### Drawer History
- _hdwid
- _dwid
- _mid
- one_coin
- two_coin
- five_coin
- ten_coin
- twenty_coin
- one_hundred_coin
- five_hundred_coin
- one_thosand_coin
- created_by
- created_at
- updated_by
- updated_at
- deleted_at
  
### Transaction Order
- _tid
- _mid
- _cid
- note
- discount
- drawer_order
- product_order
- total
- is_payment
- is_refund
- payment_at
- created_by
- created_at
- updated_by
- updated_at
  
### Employee
- _eid
- name
- lastname
- phone
- email
- username
- password
- role
- is_verify
- is_delete
- twoFactor
- created_by
- created_at
- updated_by
- updated_at
- deleted_at

### Medal Machine
- _mid
- _eid
- theme
- name
- note
- lati_tude
- long_tude
- balance
- payment_lists
- cereal_id
- is_verify
- is_delete
- created_by
- created_at
- updated_by
- updated_at
- deleted_at
  
### Email ForgotPassword History
- _hfid
- _eid
- email
- subject
- access_token
- url_token
- is_verify
- created_by
- created_at
- updated_by
- updated_at
- deleted_at
