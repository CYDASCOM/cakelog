# About

A CLI Tool to make Looking up cakephp's log more easily.

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

### --debug

```sh
cakelog --debug # or cakelog -d
```

Just output `Debug` logs where is using:

```php
CakeLog::debug();
```

### --info

```sh
cakelog --info # or cakelog -i
```

Just output `Info` logs where is using:

```php
CakeLog::info();
```

### --nosql

```sh
cakelog --info # or cakelog -nos
```

There are so many sql's logs, using `--nosql` to ignore all sql log output, make us focus on debug or info logs.

### --sql

```sh
cakelog --sql # or cakelog -s
```

Sometimes, we want to see the sql created by cakephp, for this scenario, add `CakeLog::info("After Query");` after query statement like this:

```php
$records = $model->find('all', compact('joins', 'fields', 'conditions', 'order', 'limit', 'offset'));
CakeLog::info("After Query");
```

then, cakelog will just output the sql log before `After Query` log and the sql will be formatted and highlighted.
