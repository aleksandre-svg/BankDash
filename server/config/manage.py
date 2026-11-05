#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

    from django.conf import settings

    print("========== MANAGE.PY DATABASE TEST ==========")
    print("Settings module:", settings.SETTINGS_MODULE)
    print("Database engine:", settings.DATABASES["default"].get("ENGINE"))
    print("Database name exists:", bool(settings.DATABASES["default"].get("NAME")))
    print("Database host exists:", bool(settings.DATABASES["default"].get("HOST")))
    print("=============================================")

    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
