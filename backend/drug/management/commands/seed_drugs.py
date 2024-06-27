""" Seed drugs from a CSV file. """
import csv
from django.core.management.base import BaseCommand
from drugs.models import Drug

class Command(BaseCommand):
    """ Seed drugs from a CSV file. """
    help = 'Seed drugs from a CSV file'

    def add_arguments(self, parser):
        """ Add arguments """
        parser.add_argument('csv_file', type=str, help='The path to the CSV file.')

    def handle(self, *args, **kwargs):
        """ Handle the command """
        csv_file = kwargs['csv_file']

        with open(csv_file, 'r', encoding='cp949') as file:
            reader = csv.DictReader(file)
            for row in reader:
                drug_no = row['drug_no']
                drug_name = row['drug_name']
                drug_name_en = row['drug_name_en']
                drug_material = row['drug_material']
                drug_company = row['drug_company']
                drug_shape = row['drug_shape']
                drug_color = row['drug_color']
                drug_print_front = row.get('drug_print_front', '')
                drug_print_back = row.get('drug_print_back', '')
                drug_line_front = row.get('drug_line_front', '')
                drug_line_back = row.get('drug_line_back', '')
                drug_price_amount = float(row['drug_price_amount'])
                drug_price_unit = row['drug_price_unit']
                drug_price = int(row['drug_price'])
                drug_illness = row['drug_illness']
                drug_img_path = row['drug_img_key']

                Drug.objects.create(
                    drug_no=drug_no,
                    drug_name=drug_name,
                    drug_name_en=drug_name_en,
                    drug_material=drug_material,
                    drug_company=drug_company,
                    drug_shape=drug_shape,
                    drug_color=drug_color,
                    drug_print_front=drug_print_front,
                    drug_print_back=drug_print_back,
                    drug_line_front=drug_line_front,
                    drug_line_back=drug_line_back,
                    drug_price_amount=drug_price_amount,
                    drug_price_unit=drug_price_unit,
                    drug_price=drug_price,
                    drug_illness=drug_illness,
                    drug_img_path=drug_img_path
                )

                self.stdout.write(self.style.SUCCESS(f'Successfully added drug {drug_name}'))
