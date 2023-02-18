### About

A CLI Tool to make looking up cakephp's log more easily.

### Install

```
sudo npm i -g cakelog
```

### Usage

```sh
Usage: cakelog [options]

Options:
  -d, --debug     Just output Debug logs
  -i, --info      Just output Info logs
  -nos, --nosql   Ignore Sql output
  -s, --sql       Ignore Sql output except the Sql before "After Query"
  -h, --help      Display help for command
```

##### no option

```sh
cakelog
```

Like Linux command `tail -f`, output the latest logs.

##### --debug

```sh
cakelog --debug
```

Just output `Debug` logs where is using:

```php
CakeLog::debug();
```

##### --info

```sh
cakelog --info
```

Just output `Info` logs where is using:

```php
CakeLog::info();
```

##### --nosql

```sh
cakelog --nosql
```

There are so many sql logs, using `--nosql` to ignore all sql log output, when we want to focus on `debug` or `info` logs.

##### --sql

```sh
cakelog --sql
```

Sometimes, we want to see the sql created by cakephp, for this scenario, add `CakeLog::info("After Query");` after query statement immediately like this:

```php
$records = $model->find('all', compact('joins', 'fields', 'conditions', 'order', 'limit', 'offset'));
CakeLog::info("After Query");
```

then, cakelog will just output the sql log above `After Query` log and the sql will be formatted and highlighted.
